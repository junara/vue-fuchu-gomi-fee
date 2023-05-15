<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { ref } from 'vue'
import Papa from 'papaparse'
interface GomiFee {
  name: string
  furigana: string
  fee: string
}

const emits = defineEmits<{
  (event: 'change', v: GomiFee[]): void
}>()

const gomiFees = ref<GomiFee[]>([])
const { open, onChange } = useFileDialog({
  accept: '.csv',
  multiple: false,
})
onChange((files) => {
  if (!files) return
  if (!files.length) return
  Papa.parse(files[0], {
    header: true,
    complete: (results) => {
      gomiFees.value = results.data.map((row: any) => {
        return {
          name: row['品目'],
          furigana: row['ふりがな'],
          fee: row['料金'],
        }
      })
      emits('change', gomiFees.value)
    },
  })
})
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <button type="button" @click="open()">CSVファイル選択</button>
    <ul>
      <li>
        <a href="https://github.com/junara/vue-fuchu-gomi-fee/blob/main/src/data/fuchu-gomi.csv"
          >サンプルCSVデータ</a
        >
        <div>
          東京都府中市が
          <a
            href="https://www.city.fuchu.tokyo.jp/kurashi/gomirisaikuru/dashikata/sodaigomi/sodaigomidasikata.html"
            >提供している</a
          >
        </div>
        <div>データを使用しています。</div>
      </li>
    </ul>
  </div>
</template>
