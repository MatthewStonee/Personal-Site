<template>
  <v-container>
      <div class="calculator">

        <div class="display"> {{current || '0'}} </div>
        <div @click="clear" class="btn">C</div>
        <div @click="sign" class="btn">+/-</div>
        <div @click="percent" class="btn">%</div>
        <div @click="divide" class="btn operator">÷</div>
        <div @click="append('7')" class="btn">7</div>
        <div @click="append('8')" class="btn">8</div>
        <div @click="append('9')" class="btn">9</div>
        <div @click="times" class="btn operator">×</div>
        <div @click="append('4')" class="btn">4</div>
        <div @click="append('5')" class="btn">5</div>
        <div @click="append('6')" class="btn">6</div>
        <div @click="minus" class="btn operator">−</div>
        <div @click="append('1')" class="btn">1</div>
        <div @click="append('2')" class="btn">2</div>
        <div @click="append('3')" class="btn">3</div>
        <div @click="add" class="btn operator">+</div>
        <div @click="append('0')" class="btn zero">0</div>
        <div @click="dot" class="btn">.</div>
        <div @click="equal" class="btn operator">=</div>


      </div>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      current: '',
      operator: null,
      operatorClicked: false,
    }
  },

  methods: {
    clear() {
      this.current = '';
    },

    sign() {
      if (!(this.current === 0 || this.current === ''))
        this.current = this.current.charAt(0) === '-' ?
          this.current.slice(1) : `-${this.current}`;
    },

    percent() {
      if (!(this.current === ''))
        this.current = `${parseFloat(this.current) / 100}`
    },

    append(number) {

      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      if (!(this.current.length === 16 || this.current === '0'))
        this.current = `${this.current}${number}`;
    },

    dot() {
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },

    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;


    },

    divide() {
      this.operator = (a, b) => a / b;
      this.setPrevious();

    },

    times() {
      this.operator = (a, b) => a * b;
      this.setPrevious();

    },

    minus() {
      this.operator = (a, b) => a - b;
      this.setPrevious();

    },

    add() {
      this.operator = (a, b) => a + b;
      this.setPrevious();

    },

    equal() {
      if (this.previous !== null) {
        this.current = `${this.operator(
            parseFloat(this.previous),
            parseFloat(this.current)
        )}`;
      }
      this.previous = null;
    },

  }

}

</script>

<style scoped>

.calculator {
  margin: 0 auto;
  width: 360px;
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
}
.zero
{
  grid-column: 1 / 3;
}

.btn {
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
}

.btn:hover {background-color: #999999 }

.operator {
  background-color: gray;
  color: white;

}

</style>
