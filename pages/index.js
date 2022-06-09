import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { IMAGE1, IMAGE2, IMAGE3, IMAGE4 } from '../assets'
import { useEffect, useState } from "react"
// import { Input } from '@chakra-ui/react'

export default function Home() {
	const [currenCanvas, setCurretCanvas] = useState(IMAGE4);
	let canvas = null;
	let ctx = null;
	let data = [];
	let img = null;
	console.log(IMAGE1)
	useEffect(() => {
		console.log("ready");
		// var image = new Image();
		// image.src = IMAGE1;
		document.querySelector('canvas').getContext('2d');
		init();

	}, []);

	function init() {
		canvas = document.querySelector('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = 500;
		canvas.style.width = 500;
		canvas.height = 500;
		canvas.style.height = 500;
		canvas.style.objectFit = "cover"
		img = document.createElement('img');
		img.src = canvas.getAttribute('data-src');
		console.log("source supreem", canvas.getAttribute('data-src'));
		//once the image is loaded, add it to the canvas
		img.onload = (ev) => {
			ctx.drawImage(img, 0, 0);
			//call the context.getImageData method to get the array of [r,g,b,a] values
			let imgDataObj = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			);
			data = imgDataObj.data; //data prop is an array
			// console.log(.data.length, 900 * 500 * 4); //  has 2,160,000 elements
			// canvas.addEventListener('mousemove', getPixel);
			// document.querySelector('img').addEventListener('mousemove', getPixel);
			// canvas.addEventListener('click', addBox);
		};
	};


	function getPixel(ev, a, b) {
		//as the mouse moves around the image
		// let canvas = ev.target;
		let cols = canvas?.width;
		// let rows = canvas.height;

		// let { offsetX, offsetY, clientY, clientX } = ev;

		//call the method to get the r,g,b,a values for current pixel
		console.log("get pixel:", cols, ev, a, b);
		// ev.nativeEvent.offsetY, ev.nativeEvent.offsetX)
		// let c = getPixelColor(cols, ev.offsetY -32,  ev.offsetY-32);
		// let c = getPixelColor(cols, offsetY, offsetX);
	    let c = getPixelColor(cols, b+15, a+15);


		//build a colour string for css
		let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`; //${c.alpha / 255}
		// console.log(rgbToHex(rgbToHex));
		let pixelColor = document.getElementById('pixelColor')
		pixelColor.style.backgroundColor = clr;
		pixelColor.innerText = c.red ? clr : "";
		document.getElementById("elem").style.backgroundColor = clr;
		console.log("color", clr)
		//save the string to use elsewhere
		// pixel = clr;
		//now get the average of the surrounding pixel colours
		// getAverage(ev);
	}

	function getAverage(ev) {
		// let canvas = ev.target;
		let cols = 500;
		let rows = 500;
		console.log("ctx", ctx);

		ctx.clearRect(0, 0, cols, rows);

		ctx.drawImage(img, 0, 0);
		let { offsetX, offsetY } = ev;
		const inset = 20;

		offsetX = Math.min(offsetX, cols - inset);
		offsetX = Math.max(inset, offsetX);
		offsetY = Math.min(offsetY, rows - inset);
		offsetY = Math.max(offsetY, inset);

		let reds = 0;
		let greens = 0;
		let blues = 0;

		for (let x = -1 * inset; x <= inset; x++) {
			for (let y = -1 * inset; y <= inset; y++) {
				let c = getPixelColor(cols, offsetY + y, offsetX + x);
				reds += c.red;
				greens += c.green;
				blues += c.blue;
			}
		}
		let nums = 41 * 41;
		let red = Math.round(reds / nums);
		let green = Math.round(greens / nums);
		let blue = Math.round(blues / nums);

		let clr = `rgb(${red}, ${green}, ${blue})`;


		ctx.fillStyle = clr;
		ctx.strokeStyle = '#FFFFFF';
		ctx.strokeWidth = 2;

		// average = clr;
		ctx.strokeRect(offsetX - inset, offsetY - inset, 41, 41);
		ctx.fillRect(offsetX - inset, offsetY - inset, 41, 41);
	}

	// function componentToHex(color) { 
	//   var hex = color.toString(16);
	//   console.log(hex)
	//   return hex.length == 1 ? "0" + hex : hex;
	// }

	// function rgbToHex(r, g, b) { 
	//   console.log(r,g,b)
	//   let gex = componentToHex(r) + componentToHex(g) + componentToHex(b);
	//   console.log("why "+gex ,  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1))
	//   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	// }
	function getPixelColor(cols, x, y) {
		//see grid.html as reference for this algorithm
		let pixel = cols * x + y;
		let arrayPos = pixel * 4;
		return {
			red: data[arrayPos],
			green: data[arrayPos + 1],
			blue: data[arrayPos + 2],
			alpha: data[arrayPos + 3],
		};
	}

	// function for mouse
	function startMoving(evt) {

		console.log("moving", evt);
		evt = evt || window.event;
		var posX = evt.clientX;
		var posY = evt.clientY;
		var a = document.getElementById("elem");
		var divTop = a.style.top;
		var divLeft = a.style.left;

		divTop = divTop.replace('px', '');
		divLeft = divLeft.replace('px', '');
		var diffX = posX - divLeft;
		var diffY = posY - divTop;
		document.onmousemove = function (evt) {
			evt = evt || window.event;
			var posX = evt.clientX,
				posY = evt.clientY,
				aX = posX - diffX,
				aY = posY - diffY;
			var boun = document.getElementById("parent").offsetWidth - document.getElementById("elem").offsetWidth;
			// getPixel(evt);
			// document.querySelector('img').addEventListener('mousemove', getPixel);


			if ((aX > 0) && (aX < boun) && (aY > 0) && (aY < boun)) move('elem', aX, aY);
		}

	}

	function stopMoving() {
		console.log("stop moving")
		var a = document.createElement('script');
		document.onmousemove = function () { }
	}

	function move(divid, xpos, ypos) {
		console.log('1');
		var a = document.getElementById(divid);
		document.getElementById(divid).style.left = xpos + 'px';
		document.getElementById(divid).style.top = ypos + 'px';
		getPixel(undefined, xpos, ypos);
		// document.querySelector('canvas').addEventListener('mousemove', (e) => {
		//   console.log(xpos, ypos, e.offsetX, e.offsetY);

		// });
	}

	/**
	 * The method is for handling and setting image on the canvas.
	 * @param (file) type 
	 */
	const UploadCanvasFileHandler = (file) => {
		console.log(file, canvas, ctx);
		// const [currenCanvas, setCurretCanvas] = useState(IMAGE4.src);

		setCurretCanvas(file);
		const image = document.createElement('img');
		image.src = file;
		image.onload = () => {
			ctx.drawImage(image, 0, 0, 500, 500)
		}
		// var fileReader = new FileReader();
		// fileReader.onload = (ev) => {
		// 	// ctx.drawImage(img, 0, 0);
		// 	//call the context.getImageData method to get the array of [r,g,b,a] values
		// 	var newImage = new Image();
		// 	newImage.src = e.target.result;
		// 	newImage.onload = function () {
		// 		ctx.drawImage(0, 0, canvas.width, canvas.height);
		// 	}
		// 	fileReader.readAsDataURL(file);

		// 	// data = imgDataObj.data; 

		// }
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next </title>
				<meta name="description" content="Generated by create next " />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				{/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

				<div className={styles.grid}>
					<input type="file" accept='.png, .jpg, .jpeg'
						onChange={(event) => {
							console.log(event.target.files[0])
							UploadCanvasFileHandler(event.target.files[0]);
						}} />
					<div className={styles.flex}>
						{/* <span className="box" id="pixel" data-label="Current Pixel"></span> */}
						<span className="box" id="pixelColor" data-label=""></span>
						<span className='canvas-container' id='parent'>
							<canvas data-src={currenCanvas.src}></canvas>
							{/* <span className='dragger' draggable></span> */}
							{/* // onTouchMove={(evt) => { }}
								// onMouseMove={(e) => {
								// 	// getPixel(e)   
								// 	// e.stopPropagation();
								// 	// e.preventDefault();
								// 	// getPixel(e);
								// 	// return false;
								// }}
								// onDragOver={(e) => {
								// 	console.log("drag", e, e.clientX, e.nativeEvent.offsetY);
								// 	// getPixel(e);
								// }} */}
							<div id="elem" onMouseDown={(event) => startMoving(event)}
								onMouseUp={() => stopMoving()}></div>
							<div id="elem1" onMouseDown={(event) => startMoving(event)}
								onMouseUp={() => stopMoving()}></div>
						</span>
						{/* <img src={IMAGE2.src} loading="lazy" /> */}
						{/* <Input placeholder='Basic usage' /> */}
					</div>
					<a href="https://nextjs.org/docs" className={styles.card}>
						<h2>Documentation &rarr;</h2>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className={styles.card}>
						<h2>Learn &rarr;</h2>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/canary/examples"
						className={styles.card}
					>
						<h2>Examples &rarr;</h2>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-&utm_medium=default-template&utm_campaign=create-next-"
						className={styles.card}
					>
						<h2>Deploy &rarr;</h2>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-&utm_medium=default-template&utm_campaign=create-next-"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}
