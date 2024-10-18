import { useState } from 'react';

import './style.scss';
import wiliev from '../../assets/images/home/slider/wiliev.svg';
import wahoo from '../../assets/images/home/slider/wahoo.svg';
import trek from '../../assets/images/home/slider/trek.svg';
import topeak from '../../assets/images/home/slider/topeak.svg';
import tacx from '../../assets/images/home/slider/tacx.svg';
import sram from '../../assets/images/home/slider/sram.svg';
import shimano from '../../assets/images/home/slider/shimano.svg';

export const LoopImageSlider = () => {
	const [margin, setMargin] = useState(0);

	setTimeout(() => {
		let width = window.innerWidth;
		if (width >= 790) {
			if (margin <= -2135) { setMargin(0) }
			else { setMargin(margin-1) }
		} else {
			if (margin <= -1348) { setMargin(0) }
			else { setMargin(margin-1) }
		}
	}, 20);
	return (
		<div className='loopImageSliderContainer' style={{marginLeft: `${margin}px`}}>
			<div className="loopImageSliderContainer__imageContainer" id='imageContainer_1'>
				<img src={wiliev} alt={'wiliev'} id='wiliev'/>
				<img src={wahoo} alt={'wahoo'} id='wahoo'/>
				<img src={trek} alt={'trek'} id='trek'/>
				<img src={topeak} alt={'topeak'} id='topeak'/>
				<img src={tacx} alt={'tacx'} id='tacx'/>
				<img src={sram} alt={'sram'} id='sram'/>
				<img src={shimano} alt={'shimano'} id='shimano'/>
			</div>
			<div className="loopImageSliderContainer__imageContainer" id='imageContainer_2'>
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