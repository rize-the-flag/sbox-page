document.addEventListener( 'DOMContentLoaded', () => {

  draw();

} );


function draw() {
  const canvas = document.getElementById( 'bgCanvas' );
  if ( canvas.getContext ) {
    let ctx = canvas.getContext( '2d' );
    ctx.beginPath();
    ctx.moveTo( 13, 700 );
    ctx.quadraticCurveTo( 20, 365, 315, 100 );
    ctx.quadraticCurveTo( 580, -95, 800, 100 );
    ctx.quadraticCurveTo( 975, 275, 913, 500 );
    ctx.quadraticCurveTo( 805, 760, 450, 765 );
    ctx.quadraticCurveTo( 15, 760, 13, 550 );

    let grad = ctx.createLinearGradient( 0, 0, 0, 500 );

    grad.addColorStop( 0.05, `#ff2f96` );
    grad.addColorStop( 0.95, `#ff895e` );
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.closePath();
  }
}
