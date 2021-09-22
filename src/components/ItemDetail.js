import './ItemDetail.css';
import ItemCounter from './ItemCounter';

const ItemDetail = ( {items} ) => {

    return (
        <div className='ItemDetail' key={items.id}>
            <img className='ItemPoster' src={`../../${items.pictureUrl}`} title={items.title} alt='Poster' />
            <div className='DetailContainer'>
                <h1 className='ItemTitle'>{items.title}</h1>
                <h4 className='ItemGenre'>{items.genre}</h4>
                <p className='ItemSynopsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia ex, eget ullamcorper mi. Sed mi purus, volutpat eget diam id, laoreet aliquam quam. Fusce efficitur sapien sed sem malesuada, et ultricies mi ultricies.</p>
                <ItemCounter stock={items.stock} />
            </div>
        </div>
    );
}

export default ItemDetail;
