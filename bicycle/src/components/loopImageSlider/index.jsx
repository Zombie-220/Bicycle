import { useState } from 'react';

import './style.scss';
import wiliev from '../../assets/images/home/slider/wiliev.svg'
import wahoo from '../../assets/images/home/slider/wahoo.svg'
import trek from '../../assets/images/home/slider/trek.svg'
import topeak from '../../assets/images/home/slider/topeak.svg'
import tacx from '../../assets/images/home/slider/tacx.svg'
import sram from '../../assets/images/home/slider/sram.svg'
import shimano from '../../assets/images/home/slider/shimano.svg'

export const LoopImageSlider = () => {
	const moveSlider = () => {

	}

	// setTimeout(() => {
	// 	addChild()
	// }, 1000);

	return (
		<div className='loopImageSliderContainer'>
			<div className="loopImageSliderContainer__imageContainer">
				<img src={wiliev} alt={'wiliev'} id='wiliev'/>
				<img src={wahoo} alt={'wahoo'} id='wahoo'/>
				<img src={trek} alt={'trek'} id='trek'/>
				<img src={topeak} alt={'topeak'} id='topeak'/>
				<img src={tacx} alt={'tacx'} id='tacx'/>
				<img src={sram} alt={'sram'} id='sram'/>
				<img src={shimano} alt={'shimano'} id='shimano'/>
			</div>
			<div className="loopImageSliderContainer__imageContainer">
				<img src={wiliev} alt={'wiliev'} id='wiliev'/>
				<img src={wahoo} alt={'wahoo'} id='wahoo'/>
				<img src={trek} alt={'trek'} id='trek'/>
				<img src={topeak} alt={'topeak'} id='topeak'/>
				<img src={tacx} alt={'tacx'} id='tacx'/>
				<img src={sram} alt={'sram'} id='sram'/>
				<img src={shimano} alt={'shimano'} id='shimano'/>
			</div>
		</div>
	)
}