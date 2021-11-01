<template>
  <section
    class="search-table"
    v-if="grid && grid.rows.length">
    <article class="data-block">
      <table class="selections">
        <thead>
          <tr class="first">
            <th
              v-for="(col, index) in grid.columns"
              :key="index"
              :width="col.width"
              :align="col.align">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody
          :data-layer="gridLayerData"
          :data-title="gridTitle">
          <tr
            v-for="(row, rowIndex) in grid.rows"
            :key="rowIndex"
            class="parent hand"
            :id="row.id"
            :data-link="getGridRowHref(row)"
            @click="onRowClick(row)">
            <td
              v-for="(
                gridItem, gridItemIndex
              ) in row.gridItems"
              :key="gridItemIndex"
              :style="getGridItemStyle(gridItem)"
              v-html="gridItem.value"></td>
          </tr>
        </tbody>
      </table>
      <menu class="pager">
        <li>{{ grid.rows.length }} results</li>
      </menu>
    </article>
  </section>
</template>

<script lang="ts">
import GridItemModel from "@/models/Mediakiwi/GridItemModel";
import GridModel from "@/models/Mediakiwi/GridModel";
import GridRowModel from "@/models/Mediakiwi/GridRowModel";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "Grid",
  props: {
    grid: {
      type: Object as PropType<GridModel>,
      required: true,
    },
  },
  computed: {
    gridLayerData() {
      if (
        this.grid &&
        this.grid.layerConfiguration
      ) {
        return `width: ${this.grid.layerConfiguration.width}; height: ${this.grid.layerConfiguration.height}`;
      }
      return null;
    },
    gridTitle() {
      if (this.grid && this.grid.title) {
        return this.grid.title;
      }
      return null;
    },
  },
  methods: {
    getGridItemStyle(gridItem: GridItemModel) {
      let style = "";
      if (gridItem) {
        if (!gridItem.canWrap) {
          style += " white-space: nowrap";
        }
      }
      return style;
    },
    getGridRowHref(gridRow: GridRowModel) {
      if (!gridRow) {
        return null;
      }
      return `${gridRow.href}`;
    },
    onRowClick(gridRow: GridRowModel) {
      if (gridRow.href) {
        window.location.href = gridRow.href;
        return true;
      }
      return false;
    },
  },
});
</script>

<style scoped lang="scss">
.search-table {
  margin-top: 20px;

  table.selections {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        border-bottom: solid 1 px #e3e5e6 !important;
      }
    }

    tbody {
      border-bottom: solid 1px #e3e5e6;

      tr {
        &.hand {
          td {
            cursor: pointer;
          }
        }
      }
    }

    tr {
      td,
      th {
        color: #212121;
        font-weight: 700;
        border-top: solid 1px #e3e5e6;
        text-align: left;
        vertical-align: middle;

        &:first-child {
          padding-left: 20px;
        }
      }

      th {
        padding: 5px 10px;
        background-color: #f6f7f7;
      }

      td {
        color: #4e5862;
        border-left: 0;
        font-weight: 400;
        padding: 8px 10px 8px 12px;
      }
    }
  }

  menu.pager {
    list-style-type: none;
    float: right;
    width: 100%;
    margin-right: 0;
    padding: 10px 20px 0;
    margin-left: 4 px;
    border-top: solid 1 px #dcdee0;
    text-align: center;
    margin-top: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    li {
      float: left;
      line-height: 30px;
      margin-right: 4px;
    }
  }
}
</style>
