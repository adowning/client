<template>
  <div id="processes">
    <div id="dateSelectionSection" class="topSection is-vertical-center">
      <date-selection :range="range" @updateRange="updateRange" />
    </div>
    <div class="section" id="infoSection">
      <div v-if="selectedWindow !== null">
        <span class="bold">Window: </span>
        <span class="selectable">{{ selectedWindow.title }}</span>
      </div>
      <div v-else-if="selectedProcess !== null">
        <span class="bold">Path: </span>
        <span class="selectable">{{ selectedProcess.path }}</span>
      </div>

      <div v-if="selectedProcess !== null">
        <span class="bold">Process: </span>
        <span class="selectable">{{ selectedProcess.name }}</span>
      </div>

      <div v-if="selectedWindow !== null">
        <span class="bold">Time: </span>
        <!-- <span>{{ timeAsString(selectedWindow.time) }}</span> -->
      </div>
      <div v-else-if="selectedProcess !== null">
        <span class="bold">Time: </span>
        <!-- <span>{{ timeAsString(selectedProcess.time) }}</span> -->
      </div>

      <div v-if="selectedWindow !== null">
        <label class="bold" for="windowTypeSelection">Type: </label>
        <select id="windowTypeSelection" :style="{ color: selectedWindow.color }" @change="setWindowType">
          <option :value="selectedWindow.type" :style="{ color: selectedWindow.color }">
            {{ selectedWindow.type }}
          </option>
          <option
            v-for="typeData in getTypesBesides(selectedWindow.type)"
            :key="typeData.type"
            :value="typeData.type"
            :style="{ color: typeData.color }"
          >
            {{ typeData.type }}
          </option>
        </select>
      </div>
      <div v-else-if="selectedProcess !== null">
        <label class="bold" for="processTypeSelection">Type: </label>
        <select id="processTypeSelection" :style="{ color: selectedProcess.color }" @change="setProcessType">
          <option :value="selectedProcess.type" :style="{ color: selectedProcess.color }">
            {{ selectedProcess.type }}
          </option>
          <option
            v-for="typeData in getTypesBesides(selectedProcess.type)"
            :key="typeData.type"
            :value="typeData.type"
            :style="{ color: typeData.color }"
          >
            {{ typeData.type }}
          </option>
        </select>
      </div>
    </div>
    <div class="section" id="tableSection">
      <div id="processTableSection">
        <table class="table is-narrow" id="processTable">
          <thead>
            <tr>
              <th>Process</th>
              <th class="timeHeader">Time</th>
            </tr>
          </thead>
          <tbody v-for="process in this.processData" :key="process.id" @click="clickProcess(process)">
            <tr class="hover" :class="{ selected: selectedProcessId === process.id }">
              <td :style="{ color: process.color }">{{ process.name }}</td>
              <!-- <td>{{ timeAsString(process.time) }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <div id="windowTableSection">
        <table class="table is-narrow" id="windowTable">
          <thead>
            <tr>
              <th>Window</th>
              <th class="timeHeader">Time</th>
            </tr>
          </thead>
          <tbody v-for="window in this.windowData" :key="window.id" @click="clickWindow(window)">
            <tr class="hover" :class="{ selected: selectedWindowId === window.id }">
              <td :style="{ color: window.color }">{{ window.title }}</td>
              <!-- <td>{{ timeAsString(window.time) }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedProcess: '',
      selectedWindow: '',
      selectedProcessId: '',
      selectedWindowId: '',
      typeDatas: '',
      processData: '',
      windowData: '',
    }
  },
}
</script>
<style scoped>
#processes {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 2fr 5fr;
  height: 100%;
  margin-left: 10px;
}
#infoSection {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
#tableSection {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}
.section {
  padding: 10px;
  margin: 0 10px 10px 0;
  border-radius: 10px;
  box-shadow: 5px 5px 5px grey;
  background-color: white;
}
#processTableSection {
  margin-right: 5px;
  grid-column: 1 / 2;
  overflow: auto;
}
#processTable {
  table-layout: fixed;
}
#windowTableSection {
  margin-left: 5px;
  grid-column: 2 / 3;
  overflow: auto;
}
#windowTable {
  table-layout: fixed;
}
.topSection {
  margin: 10px 10px 10px 0;
}
.is-vertical-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
td {
  white-space: nowrap;
  overflow: hidden;
}
.selected {
  background-color: #f1f1f1;
}
tr.hover:hover {
  background-color: #eaeaea;
}
.timeHeader {
  width: 80px;
}
</style>
