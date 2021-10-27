<template>
    <section class="search-table">
        <article class="data-block">
            <table class="selections">
                <thead>
                    <tr class="first">
                        <th width="30">Order</th>
                        <th width="300">Logo</th>
                        <th>Saved</th>
                    </tr>
                </thead>
                <tbody data-layer="width:700px,height:400px" data-title="Environmental">
                    <tr class="parent hand" id="id_97$6" data-link="environmental_link_edit?item">
                        <td>1</td>
                        <td><img src="https://fti-cdn-web-nl-tst.azureedge.net/web/logoClimateCare.png" /></td>
                        <td style="white-space: nowrap">09/10/2020 13:52:40</td>
                    </tr>
                    <tr class="parent hand" id="id_97$8" data-link="environmental_link_edit?item">
                        <td>2</td>
                        <td><img src="https://fti-cdn-web-nl-tst.azureedge.net/web/logoTravelLife.png" /></td>
                        <td style="white-space: nowrap">09/10/2020 13:55:04</td>
                    </tr>
                </tbody>
            </table>
            <menu class="pager"><li>2 results</li></menu><br class="clear" />
        </article>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GridModel from "../../models/GridModel";

export default defineComponent({
    name: "Grid",
    props: {
        grid: {
            type: Object as PropType<GridModel>,
            required: true,
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
}
</style>
