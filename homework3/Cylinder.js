"use strict";
var Cylinder = { 
	numSides: 120,
	positions : {
		numComponents:3 
		}, 
		
	indices:{},
	program: undefined,
	
	init: function(){
        var dTheta = 2.0 * Math.PI / this.numSides;
		var positions = [ 0, 0, 0 ];
		var indices = [  ];
		//verteces for bottom disk generated in following for loop
		for ( var i = 0; i < this.numSides; ++i){
			var theta = i * dTheta;
			var x = Math.cos(theta),
				y = Math.sin(theta),
				z = 0;
				positions.push(x, y, z);}
		//verteces for top disk are generated in following for loop
		for ( var i = 0; i < this.numSides; ++i){
			var theta = i * dTheta;
			var x = Math.cos(theta),
				y = Math.sin(theta),
				z = 3;
				positions.push(x, y, z);}
				positions.push(0, 0, 3);
				this.positions.count = positions.length/this.positions.numComponents;
			
		indices.push(0, 1);
		for(var i = this.numSides; i > 0; --i){
			indices.push(i);
		}
		
		indices.push(this.numSides*2+1);
		for(var i = 0; i < this.numSides; ++i){
			indices.push(i+this.numSides+1);
		}
		indices.push(this.numSides+1);
		
		indices.push(1, this.numSides+1);
		
		for(var i = 1; i < this.numSides+1; ++i) {
		indices.push(this.numSides+1-i);
		indices.push(this.numSides*2+1-i)
		}
		
		console.log(indices);
		
		this.program = initShaders(gl, "Cylinder-vertex-shader", "Cylinder-fragment-shader");
		this.positions.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		
		this.indices.buffer = gl.createBuffer(); 
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		this.positions.attribute = gl.getAttribLocation(this.program, "vPosition");
	},
	draw: function(){
		gl.useProgram(this.program);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.vertexAttribPointer(this.positions.attribute,
		this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
		gl.enableVertexAttribArray(this.positions.attribute);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
		/*gl.drawArrays(gl.POINTS, 0, this.positions.count);*/
		
		
		//drawing the top disk
		var count = this.numSides+2;
		var offset = 0;
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
		
		//drawing the bottom disk
		offset += 2*count;
		count = this.numSides+2;
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
		
		//drawing the sides
		offset += 2*count;
		count = this.numSides*2+2;
		gl.drawElements(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, offset);
	}
};
