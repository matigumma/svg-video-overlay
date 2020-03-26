import React, { useState, useEffect, useRef } from 'react'

function Video() {
	const videoElement = useRef<HTMLVideoElement>(null)
	const graphicElement = useRef<HTMLImageElement>(null)
	const videoSource = useRef<HTMLSourceElement>(null)
	const posterOverlay = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [posterThumbnail, setPosterThumbnail] = useState<string>(
		`assets/sparks1.jpg`,
	)
	const [videoDuration, setVideoDuration] = useState<number>(1)
	const [videoInterval, setVideoInterval] = useState<any>()
	const [posterInterval, setPosterInterval] = useState<any>()
	const [firstPlay, setFirstPlay] = useState(true)
	const [isVideoPaused, setIsVideoPaused] = useState(false)

	useEffect(() => {
		let poster: number = 2
		const interval = () => {
			if (poster > 5) {
				poster = 1
			}
			setPosterThumbnail(`assets/sparks${poster}.jpg`)
			poster++
		}
		setPosterInterval(setInterval(interval, 1500))
		videoSource.current!.src = `assets/sparks.mp4`
		videoSource.current!.type = 'video/mp4'
		videoElement.current!.appendChild(videoSource.current!)
		videoElement.current!.onloadedmetadata = () => {
			setVideoDuration(videoElement.current!.duration)
		}
	}, [])

	const checkPlayback = (e?: React.SyntheticEvent) => {
		const video = videoElement.current as HTMLVideoElement
		if (firstPlay) return
		if (video.currentTime <= 4) {
			graphicElement.current!.classList.add('video-graphic__bottom-left')
		} else {
			graphicElement.current!.classList.remove('video-graphic__bottom-left')
		}
		if (video.currentTime >= videoDuration - 4) {
			graphicElement.current!.classList.add('video-graphic__bottom-right')
		} else {
			graphicElement.current!.classList.remove('video-graphic__bottom-right')
		}
	}

	const stopInterval = () => {
		clearInterval(videoInterval)
	}

	const handleClick = (e?: React.MouseEvent) => {
		e?.preventDefault()
		const video = videoElement.current as HTMLVideoElement
		if (!firstPlay && !isVideoPaused) {
			video.pause()
		} else if (firstPlay) {
			video.play()
			clearInterval(posterInterval)
			videoSource.current!.src = `assets/sparks.mp4`
			setFirstPlay(false)
		} else {
			video.play()
		}

		if (video.paused) {
			stopInterval()
			setIsVideoPaused(true)
		} else {
			setVideoInterval(setInterval(checkPlayback, 500))
			setIsVideoPaused(false)
		}
		checkPlayback()
	}

	return (
		<>
			<div className="video-container">
				<div
					className="poster-overlay"
					ref={posterOverlay}
					onClick={e => {
						posterOverlay.current!.style.display = 'none'
						handleClick()
					}}
				>
					<img src={posterThumbnail} alt="fire" />
				</div>
				<img
					className="video-graphic"
					src="assets/graphic.svg"
					alt="graphic"
					ref={graphicElement}
				/>
				<video
					ref={videoElement}
					preload="metadata"
					controls
					onClick={handleClick}
					onEnded={stopInterval}
					onTimeUpdate={checkPlayback}
				>
					<source ref={videoSource} />
				</video>
			</div>
		</>
	)
}

export default Video
