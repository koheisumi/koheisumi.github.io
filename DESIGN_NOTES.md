# Design Refinement Notes – koheisumi.com v11.1

## 改善概要

CSS を大幅に再構築し、以下を達成しました：

1. **統一されたグリッドシステム**
   - デスクトップ / タブレット / モバイルで明確なブレークポイント（1100px / 760px）
   - コンテンツ幅を 860px に統一
   - すべてのセクションで一貫した配置

2. **ビジュアルヒエラルキーの明確化**
   - CSS変数による体系的なタイポグラフィ（文字サイズ、行間）
   - 見出しレベル（h1, h2）と補助情報（.kicker, .meta）の区分
   - 余白の階層（8px ～ 72px）で空間を管理

3. **ナビゲーション配置**
   - デスクトップで `KOHEI SUMI` の左端とヒーロー左端が一つの垂直線に揃う
   - `CONTACT` の右端がヒーロー右端に正確に揃う
   - モバイルでのメニュー展開を簡潔に

4. **余白と行間の統一**
   - セクション間余白：72px（`--space-4xl`）
   - 本文行間：1.6（デフォルト）/ 1.8（テキストページ）
   - パディング・ガターをブレークポイント別に定義

5. **白基調で装飾を抑えた美学**
   - グリッドとタイポグラフィのみで秩序を表現
   - 線（border）を最小限に（セクション区切り、リンク下線）
   - 余白を作品を見るための静かな器として活用

## CSS 構成

```
:root
├─ 色 (--bg, --fg, --muted, --line)
├─ レイアウト (--content-width: 860px, --gutter-*)
├─ タイポグラフィ (--font-primary, --lh-*)
└─ 余白 (--space-xs ～ --space-4xl)

Header
├─ 1100px+ : max-width 860px, padding 0, center align
├─ 761～1099px : gutter 20px
└─ ～760px : gutter 16px

Main Content
├─ 1100px+ : max-width 860px, center align
├─ 761～1099px : gutter 20px
└─ ～760px : gutter 16px

Grid
├─ 1100px+ : 2列, gap 24px ～ 32px
└─ ～760px : 1列, gap 16px

Footer
├─ 1100px+ : max-width 860px, padding 0, center align
├─ 761～1099px : gutter 20px
└─ ～760px : gutter 16px
```

## 主な変更点

### 1. ブレークポイント統一
- **旧**: 760px, 1099px, 1100px が混在
- **新**: 760px, 1100px に統一（タブレット領域は明確に定義）

### 2. CSS 変数の体系化
```css
--content-width: 860px;          /* ユーザー仕様の幅 */
--gutter-desktop: 24px;          /* 1100px+ 時のパディング */
--gutter-tablet: 20px;           /* 761～1099px 時 */
--gutter-mobile: 16px;           /* ～760px 時 */
--lh-normal: 1.6;                /* 本文デフォルト */
--lh-loose: 1.8;                 /* テキストページ */
--space-4xl: 72px;               /* セクション間余白 */
```

### 3. レイアウト統一
- **ヘッダー**: desktop で max-width 860px, padding 0, margin: 0 auto
- **コンテンツ**: desktop で max-width 860px, center align
- **フッター**: desktop で max-width 860px, center align
  → 左端・右端が全て統一される

### 4. グリッド再構成
- `.grid` を responsive に（2列 ～ 1列）
- デスクトップで gap 24px～32px
- モバイルで gap 16px
- カード配置を `grid-column: span 6` から `auto-fit` に変更

### 5. TOP ページ（ヒーロー）
- 画像幅を min(860px, calc(100vw - 48px)) に制限
- figcaption 間隔を 8px に統一
- padding を responsive に設定

### 6. テキスト品質
- 本文：行間 1.6
- テキストページ（Biography, Statement）：行間 1.8
- margin-bottom を em ベースに（1.4em）
- 補助情報（.meta, .muted）を #888 に統一

### 7. ナビゲーション配置
```css
.header-inner {
  display: flex;
  justify-content: space-between;      /* KOHEI SUMI 左、nav 右に配置 */
}
/* desktop で max-width 860px になるので、nav の右端が 860px の右端に揃う */
```

### 8. 不要なスタイル削除
- 旧 v4～v11 のバージョン留年コメント削除
- `.footer-nav` の定義削除（使用されていない）
- overriding な `.contact-refined` クラスを統一

## ファイル構成（変更なし）

```
koheisumi.com/
├─ index.html          （TOP）
├─ works.html          （WORKS）
├─ projects.html       （PROJECTS）
├─ about.html          （ABOUT – リンク集）
├─ biography.html      （BIOGRAPHY）
├─ statement.html      （STATEMENT）
├─ cv.html             （CV）
├─ contact.html        （CONTACT）
├─ style.css           （新規構築）
├─ script.js           （ハンバーガーメニュー）
├─ assets/
│  └─ hero.webp        （TOP ヒーロー画像）
└─ README.md
```

## 検証ポイント

- ✅ デスクトップでのグリッド（2列）
- ✅ モバイルでのグリッド（1列）
- ✅ ヘッダー高さ（desktop 72px / mobile 64px）
- ✅ KOHEI SUMI の左端 = ヒーロー左端 = フッター左端
- ✅ CONTACT の右端 = ヒーロー右端
- ✅ TOP ページのナビゲーション・テキスト・画像の非重複
- ✅ 文字サイズ・行間・余白の統一
- ✅ モバイル時のレスポンシブ対応
- ✅ GitHub Pages での静的ファイル構成を維持

## 注記

- HTML ファイルは変更なし（内容・構造は確定済み）
- CSS のみを再構築（保守性と美学を向上）
- 外部フレームワーク・ビルド環境なし（静的 HTML/CSS/JS のみ）
- `script.js` は 9 行のシンプルなハンバーガーメニュー機能のみ
