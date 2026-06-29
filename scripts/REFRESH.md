# Обновление данных дашбордов HOSQ

Данные собираются из Excel один раз и кладутся в `data/*.json`. Сайт читает готовый JSON.

⚠️ **Исходный `.xlsx` НЕ хранится в репозитории** — он содержит контакты (email, telegram).
Держите его локально. В публичный репозиторий попадает только обезличенный `data/`.

## Шаги

1. Положите свежий `hosq_project_profile_v7_enriched.xlsx` в папку `source/`.
2. Запустите сборку:
   ```bash
   npm run data
   # = python3 scripts/build_data.py source/hosq_project_profile_v7_enriched.xlsx
   ```
3. Проверьте `data/build_report.txt` — там покрытие и пропуски.
4. Опубликуйте:
   ```bash
   git add -A && git commit -m "data refresh $(date +%F)" && git push
   ```
   Render задеплоит автоматически за ~1 минуту.

## Что делает скрипт (правила честности)
- `GAP:notion_missing` и пустое → «нет данных» (null), никогда не «0».
- jobs / международные партнёры с нулём → «нет данных» (поле не заполнено).
- онлайн-охват ≥ 1 млн → карантин (только кейс Notations Lab, помечен как не верифицированный).
- events/team/partners → отдельный кейс Notations Lab, НЕ портфельные итоги.
- A–J → покрытие доказательствами (доля заполненных полей), НЕ баллы.
- PII (email, telegram, контактные лица) → удаляется из публичного JSON.

Зависимость: `python3` + `openpyxl` (`pip install openpyxl`).
