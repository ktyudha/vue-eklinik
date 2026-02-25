// components/UI/Table/index.ts
export { default as TableWrapper } from './TableWrapper.vue'
export { default as Table } from './Table.vue'
export { default as TableHeader } from './TableHeader.vue'
export { default as TableBody } from './TableBody.vue'
export { default as TableFoot } from './TableFoot.vue'
export { default as TableRow } from './TableRow.vue'
export { default as TableCell } from './TableCell.vue'
export { default as TableNotFound } from './TableNotFound.vue'
export { default as TableLoading } from './TableLoading.vue'


import { withSubComponents } from '@/helpers'
// Table Action
import TableActionBase from './TableAction.vue'
import TableActionButton from './TableActionButton.vue'

export const TableAction = withSubComponents(TableActionBase, {
    Button: TableActionButton,
})