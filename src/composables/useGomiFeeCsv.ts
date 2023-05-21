import type { ParseResult } from 'papaparse';
import Papa from 'papaparse';
import type { GomiFeeRow } from '@/types/GomiFeeRow';
import type { GomiFee } from '@/types/GomiFee';
import { ref } from 'vue';

export default function useGomiFeeCsv() {
  const gomiFees = ref<GomiFee[]>([]);
  const gomiFeeRow2GomiFee = (row: GomiFeeRow) => {
    return {
      key: row['key'],
      name: row['品目'],
      furigana: row['ふりがな'],
      fee: row['料金'],
    };
  };
  const importFromFile = (file: File, callback: (gomiFees: GomiFee[]) => void) => {
    Papa.parse(file, {
      header: true,
      complete: (results: ParseResult<GomiFeeRow>) => {
        gomiFees.value = results.data.map((row) => {
          return gomiFeeRow2GomiFee(row);
        });
        callback(gomiFees.value);
      },
    });
  };

  const importFromString = (csv: string, callback: (gomiFees: GomiFee[]) => void) => {
    Papa.parse(csv, {
      header: true,
      complete: (results: ParseResult<GomiFeeRow>) => {
        gomiFees.value = results.data.map((row) => {
          return gomiFeeRow2GomiFee(row);
        });
        callback(gomiFees.value);
      },
    });
  };

  const importFromUrl = (csvUrl: string, callback: (gomiFees: GomiFee[]) => void) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results: ParseResult<GomiFeeRow>) => {
        gomiFees.value = results.data.map((row) => {
          return gomiFeeRow2GomiFee(row);
        });
        callback(gomiFees.value);
      },
    });
  };

  return {
    importFromFile,
    importFromString,
    importFromUrl,
  };
}
