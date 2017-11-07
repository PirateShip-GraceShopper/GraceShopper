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
      productNameField: ''
    }
  }
  componentDidMount() {
    const selectedProduct = this.props.products.find(product => product.id === +this.props.match.params.id)
    this.setState({
      product: selectedProduct,
      productNameField: selectedProduct.name,
      productInventory: selectedProduct.inventory,
      productPrice: selectedProduct.price,
      submitted: false
    })
    this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    render() {
      return (
        <Form onSubmit={(event) => {
          this.props.updateProductInfo(event, this.state.product)}
        }
          >
          <FormItem
          label="ProductName"
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
        </Form>
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
        price: +event.target.productPrice.value
      }
      dispatch(updateProduct(updatedProduct))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductInfo)
