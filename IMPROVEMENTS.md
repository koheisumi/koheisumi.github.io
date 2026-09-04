# koheisumi.com Design Refinement v21 → v22

## 対応した改善点

### 1. TOP ページ ヒーロー画像
- ✅ **画像を3枚に限定**
  - hero_01_hantou.webp（《半島の傷跡》）
  - hero_04_volcanic_rock.webp（火山岩）
  - hero_05_mountain.webp（山の写真）
  - hero_02_domestic.webp（Domestic Jealousy）を除外
  - hero_03_red_spike.webp（Red Spike）を除外

- ✅ **画像の表示方式**
  - object-fit: contain（引き伸ばさない）
  - object-position: center center（デスクトップ）
  - object-position: center top（モバイル）
  - 画像は pure trimming で対応

- ✅ **ウィンドウ幅変更時の見切れ対策**
  - ブラウザ幅が変わっても見切れが悲惨にならない設計
  - contain モード + 適切な focal point で対応

### 2. ABOUT ページ
- ✅ **サイト名の重複表示を排除**
  - ヘッダーに KOHEI SUMI がある
  - ABOUT ページ本文上部の "ABOUT" アイブロウ（eyebrow）を削除
  - アンカーナビゲーションのみを表示（PROFILE / STATEMENT / CURRICULUM VITAE）

- ✅ **レイアウト**
  - 左：本文（Profile / Statement / Curriculum Vitae）
  - 右：帯状写真（about_band.webp）
  - スマホ：縦積み表示

### 3. ハンバーガーメニュー
- ✅ **表示方式**
  - 右上に小さくドロップダウン表示（既に実装済み）
  - 画面中央に巨大に出現しない
  - メニューパネル幅：min(210px, calc(100vw - 36px))
  - 影と背景で控えめに実装

### 4. ナビゲーション構造
- ✅ **項目**
  - TOP
  - WORKS
  - PROJECTS
  - ABOUT
  - CONTACT（mailto: リンク）

### 5. CV（Curriculum Vitae）
- ⚠️ **注記**
  - 英語版の地名表記は、Word CV との整合を確認中
  - 日本語版は Word データを優先
  - 英語版の「市・区」表記の統一は次段階

### 6. CSS 構造
- ✅ **レスポンシブ対応**
  - Desktop（1100px+）：左領域＋右ヒーロー
  - Tablet（761px～1099px）：調整版
  - Mobile（～760px）：フルスクリーン表示

- ✅ **ヘッダー**
  - fixed + sticky な動作
  - スクロール下降時に隠れる
  - スクロール上昇時に表示

- ✅ **スライドショー**
  - 12秒間隔で切り替え（ゆっくり）
  - prefers-reduced-motion を尊重

### 7. デザイン美学
- ✅ **白基調・装飾抑制**
  - 背景：#fff
  - 本文：#111
  - 補助情報：#858585
  - 線：#e7e7e7（最小限）

- ✅ **タイポグラフィ**
  - ブランド（KOHEI SUMI）：貂明朝
  - 本文：Helvetica Neue + 日本語フォント

- ✅ **余白と行間**
  - セクション間：適切な間隔
  - 行間：読みやすさ重視

## 技術仕様

### ファイル構成
- index.html（TOP – ヒーロー画像3枚スライドショー）
- works.html（WORKS）
- projects.html（PROJECTS）
- about.html（ABOUT – Profile / Statement / CV）
- style.css（統合 CSS）
- script.js（言語切り替え、メニュー、スライドショー）
- assets/
  - hero_01_hantou.webp
  - hero_04_volcanic_rock.webp
  - hero_05_mountain.webp
  - about_band.webp
  - work_keren.webp

### 機能
- 日本語 / 英語の言語切り替え（localStorage で保存）
- ハンバーガーメニュー（右上、小さく控えめ）
- スライドショー（12秒間隔、ゆっくり）
- ヘッダー自動隠蔽（スクロール時）
- レスポンシブレイアウト

## 確認事項

- ✅ GitHub Pages でそのまま動作
- ✅ 外部フレームワークなし
- ✅ 指定外の画像は使用していない
- ✅ 画像の引き伸ばしなし
- ✅ ハンバーガーメニュー中央ドーン禁止
- ✅ ABOUT ページのサイト名重複なし
- ✅ ヒーロー画像3枚のみ

## 次段階（必要に応じて）

1. **CV 地名表記の完全統一**
   - Word CV の確定後、英語版の地名を市・区単位で統一

2. **デザイン微調整**
   - ユーザーのレビュー後、細部の調整

3. **フォント確認**
   - 貂明朝の表示確認（フォール バック も確認）
