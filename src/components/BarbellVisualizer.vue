<template>
  <v-card width="100%" max-width="600" elevation="10" class="mx-auto">
    <v-card-title id="title">Kilo Plate Visualizer</v-card-title>
    <p id="cap">Click plates to add them to the bar. Click a plate on the bar to remove the outermost one. Or drag plates onto the bar (desktop). The kilos field syncs both ways.</p>

    <div class="visualizer-body" @dragover.prevent @drop="onBarDrop">
      <!-- Plate rack -->
      <div class="plate-rack">
        <div
          v-for="p in PLATE_DENOMINATIONS"
          :key="p.kg"
          class="rack-plate"
          :style="rackPlateStyle(p)"
          @click="addPlate(p.kg)"
          draggable="true"
          @dragstart="onRackDragStart($event, p.kg)"
          :title="p.kg + ' kg — click to add'"
        >
          {{ p.kg }}
        </div>
        <v-btn
          icon
          size="small"
          variant="text"
          @click="clearBar"
          title="Clear all plates"
          class="clear-btn"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </div>

      <!-- Barbell -->
      <div class="barbell-bar">
        <!-- Left sleeve -->
        <div class="sleeve sleeve-left">
          <div
            v-for="(kg, i) in [...platesOnBar].reverse()"
            :key="'L' + i"
            class="bar-plate"
            :style="barPlateStyle(kg)"
            @click="removePlate()"
            title="Click to remove outermost plate"
          >
            <span class="plate-label">{{ kg }}</span>
          </div>
        </div>

        <div class="bar-collar"></div>
        <div class="bar-shaft">
          <span class="shaft-label">20 kg bar</span>
        </div>
        <div class="bar-collar"></div>

        <!-- Right sleeve -->
        <div class="sleeve sleeve-right">
          <div
            v-for="(kg, i) in platesOnBar"
            :key="'R' + i"
            class="bar-plate"
            :style="barPlateStyle(kg)"
            @click="removePlate()"
            title="Click to remove outermost plate"
          >
            <span class="plate-label">{{ kg }}</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <v-text-field
          label="Kilos (one side)"
          type="number"
          v-model="kilosInput"
          variant="outlined"
          density="compact"
          placeholder="45"
          class="kilos-field"
          hide-details
        ></v-text-field>
        <div class="result-text" v-if="platesOnBar.length > 0 || kilosInput">
          <strong>{{ totalLbs }} lbs</strong> on bar
        </div>
        <div class="result-text hint" v-else>
          Click plates above to load the bar
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
const PLATE_DENOMINATIONS = [
  { kg: 25,   color: '#D32F2F', rackHeight: 52, barHeight: 90,  width: 26 },
  { kg: 20,   color: '#1565C0', rackHeight: 48, barHeight: 82,  width: 24 },
  { kg: 15,   color: '#F9A825', rackHeight: 44, barHeight: 74,  width: 22 },
  { kg: 10,   color: '#2E7D32', rackHeight: 40, barHeight: 66,  width: 20 },
  { kg: 5,    color: '#9E9E9E', rackHeight: 36, barHeight: 58,  width: 17 },
  { kg: 2.5,  color: '#E91E63', rackHeight: 32, barHeight: 50,  width: 14 },
  { kg: 1.25, color: '#78909C', rackHeight: 28, barHeight: 42,  width: 11 },
]

export default {
  name: 'BarbellVisualizer',

  data: () => ({
    PLATE_DENOMINATIONS,
    platesOnBar: [],
    kilosInput: '',
    draggingKg: null,
    _suppressWatch: false,
  }),

  computed: {
    oneSideKg() {
      return this.platesOnBar.reduce((s, k) => s + k, 0)
    },
    totalLbs() {
      return Math.round(this.oneSideKg / 0.45359237 * 2 + 44)
    },
  },

  watch: {
    platesOnBar: {
      handler(val) {
        if (this._suppressWatch) return
        this._suppressWatch = true
        const total = val.reduce((s, k) => s + k, 0)
        this.kilosInput = total > 0 ? String(total) : ''
        this.$nextTick(() => { this._suppressWatch = false })
      },
      deep: true,
    },
    kilosInput(val) {
      if (this._suppressWatch) return
      const n = parseFloat(val)
      this._suppressWatch = true
      this.platesOnBar = (!isNaN(n) && n > 0) ? this.decompose(n) : []
      this.$nextTick(() => { this._suppressWatch = false })
    },
  },

  methods: {
    rackPlateStyle(p) {
      return {
        backgroundColor: p.color,
        width: '44px',
        height: p.rackHeight + 'px',
        border: '2px solid rgba(255,255,255,0.15)',
      }
    },

    barPlateStyle(kg) {
      const p = PLATE_DENOMINATIONS.find(d => d.kg === kg) || PLATE_DENOMINATIONS[PLATE_DENOMINATIONS.length - 1]
      return {
        backgroundColor: p.color,
        width: p.width + 'px',
        height: p.barHeight + 'px',
        border: '2px solid rgba(255,255,255,0.2)',
        flexShrink: '0',
      }
    },

    addPlate(kg) {
      const idx = this.platesOnBar.findIndex(p => p < kg)
      if (idx === -1) {
        this.platesOnBar.push(kg)
      } else {
        this.platesOnBar.splice(idx, 0, kg)
      }
    },

    removePlate() {
      this.platesOnBar.pop()
    },

    clearBar() {
      this.platesOnBar = []
      this.kilosInput = ''
    },

    decompose(kilos) {
      const denoms = [25, 20, 15, 10, 5, 2.5, 1.25]
      let rem = Math.round(parseFloat(kilos) * 100) / 100
      const plates = []
      for (const d of denoms) {
        while (Math.round(rem * 100) >= Math.round(d * 100)) {
          plates.push(d)
          rem = Math.round((rem - d) * 100) / 100
        }
      }
      return plates
    },

    onRackDragStart(event, kg) {
      this.draggingKg = kg
      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData('text/plain', String(kg))
    },

    onBarDrop(event) {
      event.preventDefault()
      const kg = parseFloat(event.dataTransfer.getData('text/plain'))
      if (!isNaN(kg)) this.addPlate(kg)
      this.draggingKg = null
    },
  },
}
</script>

<style scoped>
#title {
  font-size: clamp(18px, 4vw, 30px);
  font-weight: 800;
  letter-spacing: 0.5px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  margin-bottom: 4px;
}

#cap {
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 8px;
}

.visualizer-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 16px 16px 24px;
}

/* Plate rack */
.plate-rack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.rack-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.8);
  user-select: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.rack-plate:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

.rack-plate:active {
  transform: translateY(0);
}

.clear-btn {
  opacity: 0.6;
}
.clear-btn:hover {
  opacity: 1;
}

/* Barbell */
.barbell-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  max-width: 100%;
  padding: 8px 0;
}

.sleeve {
  display: flex;
  align-items: center;
  min-width: 12px;
}

.sleeve-left {
  flex-direction: row-reverse;
}

.sleeve-right {
  flex-direction: row;
}

.bar-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  writing-mode: vertical-rl;
  font-size: 9px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.75);
  user-select: none;
  transition: opacity 0.15s;
}

.bar-plate:hover {
  opacity: 0.7;
}

.plate-label {
  line-height: 1;
}

.bar-collar {
  flex-shrink: 0;
  width: 14px;
  height: 30px;
  background: linear-gradient(180deg, #e0e0e0 0%, #9e9e9e 50%, #e0e0e0 100%);
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.bar-shaft {
  flex-shrink: 0;
  width: 160px;
  height: 14px;
  background: linear-gradient(180deg, #d4d4d4 0%, #888 50%, #d4d4d4 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shaft-label {
  font-size: 10px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

/* Stats row */
.stats-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.kilos-field {
  width: 160px;
}

.result-text {
  font-size: 18px;
  white-space: nowrap;
}

.result-text.hint {
  font-size: 14px;
  opacity: 0.5;
}
</style>
