<template>
  <section
    class="search-table"
    v-if="grid && grid.rows.length">
    <h1 v-if="grid.title">{{ grid.title }}</h1>
    <ButtonListComponent 
    v-if="grid && grid.buttons"
    :buttons="grid.buttons"/>
    <article class="data-block">
      <table class="selections">
        <thead>
          <tr class="first">
            <th
              v-for="(col, index) in filteredColumns"
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
            v-for="(row, rowIndex) in filteredRows"
            :key="rowIndex"
            class="parent hand"
            :id="row.id"
            :data-link="getGridRowHref(row)"
            @click="onRowClick(row)">
            <td
              v-for="(
                gridItem, gridItemIndex
              ) in row.items"
              :key="gridItemIndex"
              :style="getGridItemStyle(gridItem)"
              v-html="gridItem.value"></td>
          </tr>
        </tbody>
      </table>
      <menu class="pager">
        <li>{{ totalItems }}</li>
        <li>{{ gridItemsPerPage }}</li>
        <li>
          <CustomButton 
            v-if="showPrev"
            :button="prevButton"
            @button-clicked="handlePrevious"/>
            {{ currentPage }}
          <CustomButton 
            v-if="showNext"
            :button="nextButton"
            @button-clicked="handleNext"/>
        </li>
      </menu>
    </article>
  </section>
</template>

<script lang="ts">
import GridItemModel from "@/models/Mediakiwi/GridItemModel";
import GridRowModel from "@/models/Mediakiwi/GridRowModel";
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "vue";
import ButtonModel from "../../models/ButtonModel";
import { Column, Grid, Pagination, Row } from "../../models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import router from "../../router";
import { store } from "../../store";
import { ContentTypes } from "../../store/modules/Content";
import CustomButton from "../base-components/CustomButton.vue";
import ButtonListComponent from "../ButtonListComponent.vue";

export default defineComponent({
  name: "GridComponent",
  props: {
    grid: {
      type: Object as PropType<Grid>,
      required: true,
    },
    pagination: {
      type: Object as PropType<Pagination>,
      required: true
    }
  },
  components: { CustomButton, ButtonListComponent },
  setup(props) {
    const showNext = computed(() => Math.round(props.pagination.totalItems / props.pagination.itemsPerPage) < props.pagination.currentPage);
    const showPrev = computed(() => Math.round(props.pagination.totalItems / props.pagination.itemsPerPage) > props.pagination.currentPage);
    let setCount = 1;
    const gridLayerData = computed(() => {
      if (
        props.grid &&
        props.grid.layerConfiguration
      ) {
        return `width: ${props.grid.layerConfiguration.width}; height: ${props.grid.layerConfiguration.height}`;
      }
      return null;
    });

    const gridTitle = computed(() => {
      if (props.grid && props.grid.title) {
        return props.grid.title;
      }
      return null;
    });

    const maxPages = computed(() => {
      return Math.round(props.pagination.totalItems / props.pagination.itemsPerPage);
    });

    const totalItems = computed(() => {
      return `${props.pagination.totalItems} results`;
    });

    const gridItemsPerPage = computed(() => {
      return `${props.pagination.itemsPerPage} per page`;
    });

    const currentPage = computed(() => {
      return props.pagination.totalItems <= props.pagination.itemsPerPage ? `${props.pagination.currentPage} / ${props.pagination.currentPage}` : `${props.pagination.currentPage}/ ${maxPages.value}` ;
    });

    function handlePrevious() {
      if (showPrev.value) {
        store.dispatch(ContentTypes.GET_CONTENT, router.currentRoute.value.fullPath+"?Set="+ setCount--)
      }
    }
    function handleNext() {
      if (showNext.value) {
        store.dispatch(ContentTypes.GET_CONTENT,  router.currentRoute.value.fullPath+"?Set="+ setCount++)
      }
    }
    const filteredRows = computed((): Row[] => {
      if (props.grid && props.grid.rows) {
          return props.grid.rows.map((row: Row) => {
          let filtered = Object.assign({} as Row, row)
          if (props.grid && props.grid.columns) {
            let index = 0
            props.grid.columns.forEach((col: Column) => {
              if(col.isHidden) {  filtered.items.splice(index, 1) }
              index++ 
            });
          }
          return filtered
        })
      }
      return [];
    });

    const filteredColumns = computed(() => {
      if (props.grid && props.grid.columns) {
        return props.grid.columns.filter((c) => !c.isHidden)
      }
      return []
    });

    function getGridItemStyle(
      gridItem: GridItemModel
    ) {
      let style = "";
      if (gridItem) {
        if (!gridItem.canWrap) {
          style += " white-space: nowrap";
        }
      }
      return style;
    }

    function getGridRowHref(
      gridRow: GridRowModel
    ) {
      if (!gridRow) {
        return null;
      }
      return `${gridRow.href}`;
    }

    function onRowClick(gridRow: GridRowModel) {
      if (gridRow.href) {
        window.location.href = gridRow.href;
        return true;
      }
      return false;
    }

    const prevButton = ref<ButtonModel>({
      customClass: "grid-btn",
      buttonIcon: "chevron-left",
      disabled: false,
      buttondName: "prev",
      value: "",
      readOnly: false,
    });

    const nextButton = ref<ButtonModel>({
      customClass: "grid-btn btn-last",
      buttonIcon: "chevron-right",
      disabled: false,
      buttondName: "nxt",
      value: "",
      readOnly: false,
    });

    return {
      gridLayerData,
      gridTitle,
      totalItems,
      getGridItemStyle,
      getGridRowHref,
      onRowClick,
      gridItemsPerPage,
      currentPage,
      prevButton,
      nextButton,
      showNext,
      showPrev,
      handlePrevious,
      handleNext,
      filteredColumns,
      filteredRows,
    };
  },
});
</script>

<style scoped lang="scss">
.search-table {
  margin-top: 20px;
  font-family: $font-primary;
  font-size: $font-size-l;
  .grid-btn {
    margin: 0 15px;
  }
  .btn-last {
    margin-right: 0;
  }
  table.selections {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        border-bottom: solid 1px #e3e5e6;
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
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-right: 0;
    padding: 10px 20px 0;
    margin-left: 4px;
    border-top: solid 1px #dcdee0;
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
