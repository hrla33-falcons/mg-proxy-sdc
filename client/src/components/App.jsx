import React from 'react';
import Carousel from './Carousel.jsx';
import ProductDetail from './productDetail.jsx';
import OptionButtons from './optionsButtons.jsx';
import axios from 'axios'
import styled from 'styled-components';
import ZoomImages from './zoomImages.jsx'

const StyledProductDetail = styled.div`
width: 25rem;
background-color: white;
top: 3rem;
position: absolute;
height: 700px;
right: 150px;
padding-right: 50px;
padding-left: 50px;
`;

const StyledBody = styled.div`
margin-left: 20rem;
margin-right: 20rem;
`

const StyledCloseButton = styled.button`
cursor: pointer;
position: fixed;
top: 10px;
right: 10px;
width: 4rem;
height: 4rem;
border-radius: 50%;
background-position: 50%;
border: none;
`

const StyledZoomImage = styled.div`
position: absolute;
text-align: center;
top: 0%;
transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);

.card {
  flex: 1;
  min-width: 200px;
}
`

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: null,
            isOpen: false,
            currentIndex: null
        }

        this.zoomHandler = this.zoomHandler.bind(this)
        this.indexGetter = this.indexGetter.bind(this)
    }

    componentDidMount() {
        this.getProductData()
    }

    getProductData() {
        axios.get('/ikea').then((response) => {
            // console.log('hello from client', response.data)
            this.setState({
                list: response.data
            })
        })
    }

    zoomHandler() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    indexGetter(index) {
        console.log(this.state.currentIndex)
        this.setState({
            currentIndex: index
        })
    }

    render() {
        console.log(this.state.list)

        if (this.state.list === null) {
            return null
        } else {
            if (!this.state.isOpen) {

                return (
                    <div>
                        <StyledBody>
                            <div>
                                <Carousel indexGetter={this.indexGetter} zoom={this.zoomHandler} />
                            </div>
                            <StyledProductDetail>
                                <div>
                                    <ProductDetail data={this.state.list[0]} />
                                </div><br />
                                <div><OptionButtons /></div>
                            </StyledProductDetail>
                        </StyledBody>
                    </div>
                )
            } else {
                return (
                    <div>
                        <StyledCloseButton>
                            <svg onClick={() => { this.zoomHandler() }} width="20" height="20">
                                <path fill-rule="evenodd" d="M17.597 5l-5.592 5.592L6.414 5 5 6.415l5.591 5.591L5 17.597l1.414 1.414 5.591-5.592 5.592 5.592 1.414-1.414-5.592-5.591 5.592-5.591z" />
                            </svg>
                        </StyledCloseButton>
                        <StyledZoomImage style={{ 'transform': `translateY(-${this.state.currentIndex * (100 / this.state.list[0].imageSrc.length)}%)` }}>
                            {this.state.list[0].imageSrc.map((img, i) => (
                                < ZoomImages list={img} key={i} />
                            ))}
                        </StyledZoomImage>
                    </div>
                )
            }
        }
    }
}

export default App;