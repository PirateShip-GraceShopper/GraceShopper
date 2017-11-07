import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../store'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item;

class EditProductInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      productNameField: '',
      productInventory: '',
      productPrice: '',
      productImage: '',
      submitted: false
    }
  }
  componentDidMount() {
    const selectedProduct = this.props.products.find(product => product.id === +this.props.match.params.id)
    this.setState({
      product: selectedProduct,
      productNameField: selectedProduct.name,
      productInventory: selectedProduct.inventory,
      productPrice: selectedProduct.price,
      productImage: selectedProduct.image
    })
    this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    render() {
      return (
        <div>
        <img src={this.state.product.image} alt={this.state.product.name} style={{ height: '400px', width: '450px' }} />
        <Form onSubmit={(event) => {
          this.setState({submitted: true})
          this.props.updateProductInfo(event, this.state.product)}
        }
          >
          <FormItem
          label="Product Image"
          >
          <Input onChange={(event) => this.handleChange(event)} name="productImage" value={this.state.productImage} />
          </FormItem>
          <FormItem
          label="Product Name"
          >
          <Input onChange={(event) => this.handleChange(event)} name="productNameField" value={this.state.productNameField} />
          </FormItem>
          <FormItem
          label="Product Inventory"
          >
          <Input onChange={(event) => this.handleChange(event)} name="productInventory" value={this.state.productInventory} />
          </FormItem>
          <FormItem
          label="Price"
          >
          <Input onChange={(event) => this.handleChange(event)} name="productPrice" value={this.state.productPrice} />
          </FormItem>
          <Button htmlType="submit">Submit</Button>
          {!this.state.submitted ? '' : <h1>Submitted</h1>}
        </Form>
        </div>
      )
    }

  }


const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductInfo: (event, originalProduct) => {
      event.preventDefault();
      const updatedProduct = {
        id: originalProduct.id,
        name: event.target.productNameField.value,
        inventory: +event.target.productInventory.value,
        price: +event.target.productPrice.value,
        image: event.target.productImage.value
      }
      dispatch(updateProduct(updatedProduct))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductInfo)
