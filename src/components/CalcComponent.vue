<template>
  <v-container>
      <div class="calculator">

        <div class="display"> {{current || '0'}} </div>
        <button @click="clear" class="btn">C</button>
        <button @click="sign" class="btn">+/-</button>
        <button @click="percent" class="btn">%</button>
        <button @click="divide" class="btn operator">÷</button>
        <button @click="append('7')" class="btn">7</button>
        <button @click="append('8')" class="btn">8</button>
        <button @click="append('9')" class="btn">9</button>
        <button @click="times" class="btn operator">×</button>
        <button @click="append('4')" class="btn">4</button>
        <button @click="append('5')" class="btn">5</button>
        <button @click="append('6')" class="btn">6</button>
        <button @click="minus" class="btn operator">−</button>
        <button @click="append('1')" class="btn">1</button>
        <button @click="append('2')" class="btn">2</button>
        <button @click="append('3')" class="btn">3</button>
        <button @click="add" class="btn operator">+</button>
        <button @click="append('0')" class="btn zero">0</button>
        <button @click="dot" class="btn">.</button>
        <button @click="equal" class="btn operator">=</button>


      </div>
    </v-container>
</template>

<script>
export default {
  created() {
    document.title = "Calculator";
  },

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
      this.previous = null;
      this.operator = null;
      this.operatorClicked = false;
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
      if (this.current.length === 16) return;
      if (this.current === '0' && number !== '.') {
        this.current = `${number}`;
      } else {
        this.current = `${this.current}${number}`;
      }
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
        const result = this.operator(
          parseFloat(this.previous),
          parseFloat(this.current)
        );
        this.current = isFinite(result) ? `${result}` : 'Error';
      }
      this.previous = null;
    },

  }

}

</script>

<style scoped>

.calculator {
  margin: 0 auto;
  width: min(360px, 100%);
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
