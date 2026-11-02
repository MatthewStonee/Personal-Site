<template>
  <v-container>
      <div class="calculator">

        <div class="display" aria-live="polite"> {{calc.current || '0'}} </div>
        <button @click="clear" class="btn">C</button>
        <button @click="sign" class="btn">+/-</button>
        <button @click="percent" class="btn">%</button>
        <button @click="operate('÷')" class="btn operator">÷</button>
        <button @click="append('7')" class="btn">7</button>
        <button @click="append('8')" class="btn">8</button>
        <button @click="append('9')" class="btn">9</button>
        <button @click="operate('×')" class="btn operator">×</button>
        <button @click="append('4')" class="btn">4</button>
        <button @click="append('5')" class="btn">5</button>
        <button @click="append('6')" class="btn">6</button>
        <button @click="operate('−')" class="btn operator">−</button>
        <button @click="append('1')" class="btn">1</button>
        <button @click="append('2')" class="btn">2</button>
        <button @click="append('3')" class="btn">3</button>
        <button @click="operate('+')" class="btn operator">+</button>
        <button @click="append('0')" class="btn zero">0</button>
        <button @click="dot" class="btn">.</button>
        <button @click="equal" class="btn operator">=</button>


      </div>
    </v-container>
</template>

<script>
import * as calculator from '../utils/calculator.js'

export default {
  data() {
    return {
      calc: calculator.initialState(),
    }
  },

  methods: {
    clear() {
      this.calc = calculator.initialState();
    },

    sign() {
      this.calc = calculator.toggleSign(this.calc);
    },

    percent() {
      this.calc = calculator.percent(this.calc);
    },

    append(digit) {
      this.calc = calculator.inputDigit(this.calc, digit);
    },

    dot() {
      this.calc = calculator.inputDot(this.calc);
    },

    operate(operator) {
      this.calc = calculator.chooseOperator(this.calc, operator);
    },

    equal() {
      this.calc = calculator.equals(this.calc);
    },

  }

}

</script>

<style scoped>

.calculator {
  margin: 0 auto;
  width: min(360px, calc(100% - 32px));
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(55px, auto);
  text-align: center;
}

.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
  text-align: right;
  padding-right: 10px;
  overflow-x: auto;
  white-space: nowrap;
}
.zero
{
  grid-column: 1 / 3;
}

.btn {
  color: black;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #F2F2F2;
  border: 1px solid #999;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
  margin: 0;
}

.btn:hover {background-color: #999999 }

.operator {
  background-color: gray;
  color: white;
}

</style>
