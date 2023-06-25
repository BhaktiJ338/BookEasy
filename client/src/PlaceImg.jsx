//get main image of a place
import Image from "./Image";
const PlaceImg = ({place, index=0, className=null})=>{
    if(!place.photos?.length) return '';

    if(!className){
        className = 'object-cover'
    }

    return (
        <Image className={className} src={place.photos[index]} alt="" />
    )
} 

export default PlaceImg