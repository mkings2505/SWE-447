var Cube = {
	count: 8, //represents the vertices corners of a square
	positions : {
		values : new Float32Array(
		[0, 0, 0, //vertex 0
		1.5, 0, 0, //vertex 1
		1.5, 1.5, 0, //vertex 2
		0, 1.5, 0, //vertex 3
		0, 0, -1.5, //vertex 4
		1.5, 0, -1.5, //vertex 5
		1.5, 1.5, -1.5, //vertex 6
		0, 1.5, -1.5, //vertex 7
		]),
		numComponents : 3
	},
	
	indices : [
	0, 1, 2, 0, 2, 3, //front
	1, 5, 6, 1, 6, 2, //left
	3, 2, 6, 3, 6, 7, //top
	0, 3, 4, 4, 3, 7, //right	
	5, 4, 7, 5, 7, 6, //back
	4, 5, 1, 4, 1, 0  //bottom
	],

init : function( ) {
	this.program = initShaders( gl, "Cube-vertex-shader", "Cube-fragment-shader");
	gl.useProgram(this.program);
	
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);
	this.positions.attribute = gl.getAttribLocation(this.program, "vPosition");
	gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(this.positions.attribute);
	this.indices.buffer = gl.createBuffer(); 
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
},
draw : function () {
	gl.useProgram(this.program);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
	gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
	gl.enableVertexAttribArray(this.positions.attribute);
	var start = 0;
	var count = this.count;
	//gl.drawArrays(gl.POINTS, start, count);
	count = 36;
	offset = 0;
	gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset)
}
};
