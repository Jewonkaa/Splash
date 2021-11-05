import { directive, tsImportEqualsDeclaration } from "@babel/types";
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import InputNumberButton from "./numberButton";
import SplashScreen from "react-native-splash-screen";

const buttons = [
  ['AC',' ' , 'DEL', '/'],
  ['7','8','9','*'],
  ['4','5','6', '-'],
  ['1','2','3','+'],
  ['.', '0', ' ','=']
];

const buttonsHorizontal = [
  ['x!','()','AC', 'DEL'],
  ['10^x','7','8','9','/'],
  ['log10','4','5','6', '*'],
  ['x^2','1','2','3','-'],
  ['x^3','0', '.', '=', '+']
];

const isVertical = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const isHorizontal = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

class App extends Component {

 

  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState;
    this.state = {
      orientation: isVertical() ? 'portrait' : 'landscape'
    };

    

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isVertical() ? 'portrait' : 'landscape'
      });
    });
  }

  componentDidMount() {
    SplashScreen.hide();
 }


  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
                  value={buttonItems}
                  handleOnPress={this.handleInput.bind(this, buttonItems)}
                  key={'btn-' + buttonIndex} />
      });
      return <View style={styles.inputRow} key={'row-'+index}>{rowItem}</View>
    });
    return layouts
  }

  renderButtonsHorizontal() {
    let layouts = buttonsHorizontal.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
                  value={buttonItems}
                  handleOnPress={this.handleInput.bind(this, buttonItems)}
                  key={'btn-' + buttonIndex} />
      });
      return <View style={styles.inputRow} key={'row-'+index}>{rowItem}</View>
    });
    return layouts
  }

  handleInput = (input) =>{
    const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })
        if(!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;
      case '.' :
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !=='.' ? displayValue + input : displayValue
        })
        if(!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;

      case '=' :
        let formatOperator = (operator == '*') ? '*' : (operator == '/') ? '/' : operator
        let result = eval(firstValue+formatOperator+secondValue)
        this.setState({
          displayValue: result % 1 === 0 ? result :result.toFixed(3),
          firstValue: result % 1 === 0 ? result :result.toFixed(3),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;

      case 'AC' :
        this.setState(this.initialState);
        break;
      case 'DEL' :
        let string = displayValue.toString();
        let deletedString = string.substr(0, string.length - 1);
        let length = string.length;
        this.setState({
          displayValue: length === 1 ? '0' : deletedString,
          firstValue: length === 1 ? '' : deletedString
        })
        break;
      case 'x!':
        let num = factorialize(firstValue);
        this.setState({
          displayValue: num
        })
        break;
      case 'x^2':
        let num2 = Math.pow(firstValue, 2);
        this.setState({
          displayValue: num2
        })
        break;
      case 'x^3':
        let num3 = Math.pow(firstValue, 3);
        this.setState({
          displayValue: num3
        })
        break;
      case '10^x':
        let num10 = Math.pow(10, firstValue);
        this.setState({
          displayValue: num10
        })
        break;
      case 'log10':
        let log10 = Math.log10(firstValue);
        this.setState({
          displayValue: log10
        })
        break;

    }
  }
  

  render() {
    if(this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}>

          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {this.state.displayValue}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {this.renderButtons()}
          </View>

        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <View style={styles.resultContainer}>
            <Text style={styles.resultTextHorizontal}>
              {this.state.displayValue}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {this.renderButtonsHorizontal()}
          </View>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 3,
    justifyContent:'center',
    backgroundColor: 'black'
  },
  inputContainer: {
    flex: 5,
    backgroundColor: '#7d7d7f'
  },
  resultText: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'right'
  },
  resultTextHorizontal: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex:2,
    flexDirection: 'row'
  }
});

export default App;