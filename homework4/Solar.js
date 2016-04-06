/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

"use strict";

//---------------------------------------------------------------------------
//
//  Declare our "global" variables, including the array of planets (each of
//    which is a sphere)
//

var canvas = undefined;
var gl = undefined;

// The list of planets to render.  Uncomment any planets that you are 
// including in the scene For each planet in this list, make sure to 
// set its distance from the sun, as well its size and colors 
var Planets = {
  Sun : new Sphere(),
  Mercury : new Sphere(),
  Venus : new Sphere(),
  Earth : new Sphere(),
  Moon : new Sphere(),
  Mars : new Sphere(),
  Jupiter : new Sphere(),
  Saturn : new Sphere(),
  Uranus : new Sphere(),
  Neptune : new Sphere(),
  Pluto : new Sphere()
};

// Viewing transformation parameters
var V = undefined;  // matrix storing the viewing transformation

// Projection transformation parameters
var P = undefined;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

// An angular velocity that could be applied to 
var angularVelocity = Math.PI / 10;

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;
  for (var name in Planets ) {
    
    var p = Planets[name];

    p.vertexShader = "Planet-vertex-shader";
    p.fragmentShader = "Planet-fragment-shader";

    p.init(18,8); 

    p.uniforms = { 
      color : gl.getUniformLocation(p.program, "color"),
      MV : gl.getUniformLocation(p.program, "MV"),
      P : gl.getUniformLocation(p.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;
  console.log(time);

  var ms = new MatrixStack();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Specify the viewing transformation, and use it to initialize the 
  // matrix stack
  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  // Note: You may want to find a way to use this value in your
  //  application
  var angle = time * angularVelocity;

  //
  // Render the Sun.  Here we create a temporary variable to make it
  //  simpler to work with the various properties.
  //

  var Sun = Planets.Sun;
  var radius = SolarSystem.Sun.radius;
  var color = SolarSystem.Sun.color;

  ms.push();
  ms.scale(radius*.6);
  gl.useProgram(Sun.program);
  gl.uniformMatrix4fv(Sun.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Sun.uniforms.P, false, flatten(P));
  gl.uniform4fv(Sun.uniforms.color, flatten(color));
  //Sun.pointMode = true;
  Sun.draw();
  ms.pop();

  //
  //  Add your code for more planets here!
  //
  var orbitScaler = 45;
  var Mercury = Planets.Mercury;
  var radius = SolarSystem.Mercury.radius;
  var color = SolarSystem.Mercury.color;
  var distance = SolarSystem.Mercury.distance;

  ms.push();
  ms.rotate(angle*17, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(distance*45, 0, 0); 
  ms.scale(radius*5);
  gl.useProgram(Mercury.program);
  gl.uniformMatrix4fv(Mercury.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Mercury.uniforms.P, false, flatten(P));
  gl.uniform4fv(Mercury.uniforms.color, flatten(color));
  //Mercury.pointMode = true;
  Mercury.draw();
  ms.pop();
  
  var Venus = Planets.Venus;
  var radius = SolarSystem.Venus.radius;
  var color = SolarSystem.Venus.color;
  var distance = SolarSystem.Venus.distance;

  ms.push();
  ms.rotate(angle*13, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(distance*30, 0, 0); 
  ms.scale(radius);
  gl.useProgram(Venus.program);
  gl.uniformMatrix4fv(Venus.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Venus.uniforms.P, false, flatten(P));
  gl.uniform4fv(Venus.uniforms.color, flatten(color));
  //Venus.pointMode = true;
  Venus.draw();
  ms.pop();
  
  var Earth = Planets.Earth;
  var radius = SolarSystem.Earth.radius;
  var color = SolarSystem.Earth.color;
  var distance = SolarSystem.Earth.distance;

  ms.push();
  ms.rotate(angle*10, [0, 1, 0]); //scaling the angle makes the rotation faster
  ms.translate(distance * 45 * Math.sin(angularVelocity), 0, distance * 25 * Math.cos(angularVelocity));
  ms.push();
  ms.scale(radius);
  gl.useProgram(Earth.program);
  gl.uniformMatrix4fv(Earth.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Earth.uniforms.P, false, flatten(P));
  gl.uniform4fv(Earth.uniforms.color, flatten(color));
  //Earth.pointMode = true;
  Earth.draw();
  ms.pop();
  
  
  var Moon = Planets.Moon;
  var radius = SolarSystem.Moon.radius;
  var color = SolarSystem.Moon.color;
  var distance = SolarSystem.Moon.distance;

  ms.push();
  ms.rotate(angle*5, [1, 0, 0]); //scaling the angle makes the rotation faster
  ms.translate(distance * 45 * Math.sin(angularVelocity), 0, distance * 25 * Math.cos(angularVelocity));
  ms.scale(radius);
  gl.useProgram(Moon.program);
  gl.uniformMatrix4fv(Moon.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Moon.uniforms.P, false, flatten(P));
  gl.uniform4fv(Moon.uniforms.color, flatten(color));
  Moon.draw();
  ms.pop();
  ms.pop();
  
  var Mars = Planets.Mars;
  var radius = SolarSystem.Mars.radius;
  var color = SolarSystem.Mars.color;
  var distance = SolarSystem.Mars.distance;
//something is going wrong with Mars and it is not rotating around the sun... -fixed it
  ms.push();
  ms.rotate(angle*7, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-5, 0, distance * 20 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Mars.program);
  gl.uniformMatrix4fv(Mars.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Mars.uniforms.P, false, flatten(P));
  gl.uniform4fv(Mars.uniforms.color, flatten(color));
  //Mars.pointMode = true;
  Mars.draw();
  ms.pop();
  
  var Jupiter = Planets.Jupiter;
  var radius = SolarSystem.Jupiter.radius;
  var color = SolarSystem.Jupiter.color;
  var distance = SolarSystem.Jupiter.distance;

  ms.push();
  ms.rotate(angle*4, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-13, 0, distance * 22 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Jupiter.program);
  gl.uniformMatrix4fv(Jupiter.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Jupiter.uniforms.P, false, flatten(P));
  gl.uniform4fv(Jupiter.uniforms.color, flatten(color));
  //Jupiter.pointMode = true;
  Jupiter.draw();
  ms.pop();
  
  var Saturn = Planets.Saturn;
  var radius = SolarSystem.Saturn.radius;
  var color = SolarSystem.Saturn.color;
  var distance = SolarSystem.Saturn.distance;

  ms.push();
  ms.rotate(angle*3, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-22, 0, distance * 4.1 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Saturn.program);
  gl.uniformMatrix4fv(Saturn.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Saturn.uniforms.P, false, flatten(P));
  gl.uniform4fv(Saturn.uniforms.color, flatten(color));
  //Saturn.pointMode = true;
  Saturn.draw();
  ms.pop();
  
  var Uranus = Planets.Uranus;
  var radius = SolarSystem.Uranus.radius;
  var color = SolarSystem.Uranus.color;
  var distance = SolarSystem.Uranus.distance;

  ms.push();
  ms.rotate(angle*2, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-28, 0, distance * 2 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Uranus.program);
  gl.uniformMatrix4fv(Uranus.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Uranus.uniforms.P, false, flatten(P));
  gl.uniform4fv(Uranus.uniforms.color, flatten(color));
  //Uranus.pointMode = true;
  Uranus.draw();
  ms.pop();
  
  var Neptune = Planets.Neptune;
  var radius = SolarSystem.Neptune.radius;
  var color = SolarSystem.Neptune.color;
  var distance = SolarSystem.Neptune.distance;

  ms.push();
  ms.rotate(angle*1.5, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-35, 0, distance * 1.1 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Neptune.program);
  gl.uniformMatrix4fv(Neptune.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Neptune.uniforms.P, false, flatten(P));
  gl.uniform4fv(Neptune.uniforms.color, flatten(color));
  //Neptune.pointMode = true;
  Neptune.draw();
  ms.pop();
  
  var Pluto = Planets.Pluto;
  var radius = SolarSystem.Pluto.radius;
  var color = SolarSystem.Pluto.color;
  var distance = SolarSystem.Pluto.distance;

  ms.push();
  ms.rotate(angle, [0, 1, 0]); //scaling the angle make the rotation faster
  ms.translate(-42, 0, distance * .8 * Math.cos(angularVelocity)); //change the x-value to add separation between the planets, and multiply the distance in the z-value by scale number to change the distance from the sun
  ms.scale(radius);
  gl.useProgram(Pluto.program);
  gl.uniformMatrix4fv(Pluto.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Pluto.uniforms.P, false, flatten(P));
  gl.uniform4fv(Pluto.uniforms.color, flatten(color));
  //Pluto.pointMode = true;
  Pluto.draw();
  ms.pop();

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 120.0; // degrees set at 120.0
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;
