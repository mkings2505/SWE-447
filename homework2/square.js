var Square = {
	count: 4, //represents the verteces corners of a square
	positions : {
		values : new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]),
		numComponents : 2 //two points for each corner of the square
	},
	colors : {
		values : new Float32Array([0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1]),
		numComponents : 3
	}
}
function init() {
	var canvas = document.getElementById("webgl-canvas");
	
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {return; }
	var program = initShaders( gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	
	Square.positions.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Square.positions.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, Square.positions.values, gl.STATIC_DRAW);
	Square.positions.attribute = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(Square.positions.attribute, Square.positions.numComponents, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(Square.positions.attribute);

	Square.colors.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Square.colors.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, Square.colors.values, gl.STATIC_DRAW);
	Square.colors.attribute = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(Square.colors.attribute, Square.colors.numComponents, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(Square.colors.attribute);
	render();
}
function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	var start = 0;
	var count = Square.count;
	gl.drawArrays(gl.TRIANGLE_STRIP, start, count);
}
window.onload = init;

