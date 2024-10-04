import './style.scss';
import wiliev from '../../assets/images/home/slider/wiliev.svg'
import wahoo from '../../assets/images/home/slider/wahoo.svg'
import trek from '../../assets/images/home/slider/trek.svg'
import topeak from '../../assets/images/home/slider/topeak.svg'
import tacx from '../../assets/images/home/slider/tacx.svg'
import sram from '../../assets/images/home/slider/sram.svg'
import shimano from '../../assets/images/home/slider/shimano.svg'

export const LoopImageSlider = () => {
	return (
		<div className="loopImageSlider">
			<img src={wiliev} alt={wiliev} />
			<img src={wahoo} alt={wahoo} />
			<img src={trek} alt={trek} />
			<img src={topeak} alt={topeak} />
			<img src={tacx} alt={tacx} />
			<img src={sram} alt={sram} />
			<img src={shimano} alt={shimano} />
		</div>
	)
}