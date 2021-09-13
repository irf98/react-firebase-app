import './Item.css';
import ItemCounter from './ItemCounter.js';

const Catalogue = [

    {id: 'movie1', title: 'Star Wars', price: 19, pictureUrl: './img/star-wars.png'},
    {id: 'movie2', title: 'Pulp Fiction', price: 14, pictureUrl: './img/pulp-fiction.png'},
    {id: 'movie3', title: 'Halloween', price: 17, pictureUrl: './img/halloween.png'},
    {id: 'movie4', title: 'Die Hard', price: 9, pictureUrl: './img/die-hard.png'}

];

const Item = () => {

    return (
        <div className='ItemContainer'>
            {Catalogue.map(element => 
                <div className='ItemDisplay' key={element.id}>
                    <img src={element.pictureUrl} alt='Poster'/>
                    <h5>{element.title}</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia ex, eget ullamcorper mi. Sed mi purus, volutpat eget diam id, laoreet aliquam quam. Fusce efficitur sapien sed sem malesuada, et ultricies mi ultricies.</p>
                    <h4>${element.price}</h4>
                    <ItemCounter />
                    <button className='AddCart'>Add to cart</button>
                </div>
            )}
        </div>
    );  
}

export default Item;
