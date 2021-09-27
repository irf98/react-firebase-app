import './ItemDetail.css';
import ItemCounter from '../ItemCounter/ItemCounter';

const ItemDetail = ( {item} ) => {

    return (
        <div className='ItemDetail' key={item.id}>
            <img className='ItemPoster' src={`../../${item.pictureUrl}`} title={item.title} alt='Poster' />
            <div className='DetailContainer'>
                <h1 className='ItemTitle'>{item.title}</h1>
                <h4 className='ItemGenre'>{item.genre}</h4>
                <p className='ItemSynopsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia ex, eget ullamcorper mi. Sed mi purus, volutpat eget diam id, laoreet aliquam quam. Fusce efficitur sapien sed sem malesuada, et ultricies mi ultricies.</p>
                <ItemCounter item={item} />
            </div>
        </div>
    );
}

export default ItemDetail;
