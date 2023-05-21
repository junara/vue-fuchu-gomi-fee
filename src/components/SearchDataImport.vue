<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import type { GomiFee } from '@/types/GomiFee';
import useGomiFeeCsv from '@/composables/useGomiFeeCsv';

const { importFromFile } = useGomiFeeCsv();
const emits = defineEmits<{
  (event: 'change', value: GomiFee[]): void;
}>();

const { open, onChange } = useFileDialog({
  accept: '.csv',
  multiple: false,
});

onChange((files) => {
  if (!files) return;
  if (!files.length) return;

  importFromFile(files[0], (gomiFees: GomiFee[]) => {
    emits('change', gomiFees);
  });
});
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
