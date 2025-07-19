# logger-ts

[![npm version](https://badge.fury.io/js/@squilla%2Flogger-ts.svg)](https://www.npmjs.com/package/@squilla/logger-ts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

TypeScriptで書かれた柔軟で拡張可能なロガーライブラリです。設定可能なログレベル、フォーマッター、トランスポートをサポートしています。

## 🚀 特徴

- ✅ **設定可能なログレベル**: DEBUG、INFO、WARN、ERROR
- ✅ **柔軟なフォーマッター**: デフォルトフォーマッターとJSONフォーマッター
- ✅ **複数のトランスポート**: コンソール出力に対応
- ✅ **コンテキスト情報**: 追加のメタデータを含むログ出力
- ✅ **エラー処理**: エラーオブジェクトの詳細な情報を記録
- ✅ **TypeScript対応**: 完全な型安全性

## 📦 インストール

```bash
npm install @squilla/logger-ts
```

または

```bash
yarn add @squilla/logger-ts
```

## 🔧 基本的な使用方法

### 簡単な使用例

```typescript
import { LoggerFactory } from '@squilla/logger-ts';

// デフォルト設定でロガーを作成
const logger = LoggerFactory.createLogger();

// ログを出力
logger.debug('デバッグメッセージ');
logger.info('情報メッセージ');
logger.warn('警告メッセージ');
logger.error('エラーメッセージ');
```

### カスタム設定

```typescript
import { LoggerFactory, LogLevel, JSONFormatter } from '@squilla/logger-ts';

// カスタム設定でロガーを作成
const logger = LoggerFactory.createLogger({
  level: LogLevel.DEBUG,
  format: new JSONFormatter(true), // pretty-print JSON
});

logger.info('カスタム設定のログメッセージ');
```

## ⚙️ 設定オプション

### ログレベル

| レベル  | 数値 | 説明                   |
| ------- | ---- | ---------------------- |
| `DEBUG` | 0    | デバッグ情報（開発用） |
| `INFO`  | 1    | 一般的な情報           |
| `WARN`  | 2    | 警告メッセージ         |
| `ERROR` | 3    | エラーメッセージ       |

> [!NOTE]
> ログレベルを設定すると、そのレベル以上のログのみが出力されます。例えば、`LogLevel.WARN`に設定すると、WARNとERRORレベルのログのみが出力されます。

### フォーマッター

#### DefaultFormatter（デフォルト）

人間が読みやすい形式でログを出力します。

```typescript
import { LoggerFactory, DefaultFormatter } from '@squilla/logger-ts';

const logger = LoggerFactory.createLogger({
  format: new DefaultFormatter()
});
```

**出力例:**
```
[INFO] 2024-01-15T10:30:45.123Z アプリケーションが開始されました
```

#### JSONFormatter

JSON形式でログを出力します。

```typescript
import { LoggerFactory, JSONFormatter } from '@squilla/logger-ts';

// コンパクトJSON
const logger1 = LoggerFactory.createLogger({
  format: new JSONFormatter(false)
});

// Pretty-print JSON
const logger2 = LoggerFactory.createLogger({
  format: new JSONFormatter(true)
});
```

**出力例:**
```json
{
  "level": "INFO",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "message": "アプリケーションが開始されました"
}
```

### トランスポート

#### ConsoleTransport（デフォルト）

標準出力にログを出力します。

```typescript
import { LoggerFactory, ConsoleTransport } from '@squilla/logger-ts';

const logger = LoggerFactory.createLogger({
  transport: new ConsoleTransport()
});
```

## 🎯 高度な使用方法

### コンテキスト情報

ログにコンテキスト情報を追加できます。

```typescript
const logger = LoggerFactory.createLogger();

// 個別のログにコンテキストを追加
logger.info('ユーザーがログインしました', { 
  userId: 12345, 
  ip: '192.168.1.1' 
});

// ロガー作成時にデフォルトコンテキストを設定
const contextLogger = LoggerFactory.createLogger({
  context: { 
    service: 'user-service',
    version: '1.0.0' 
  }
});
```

### エラーログ

エラーオブジェクトを含むログを出力できます。

```typescript
const logger = LoggerFactory.createLogger();

try {
  // 何らかの処理
  throw new Error('データベース接続エラー');
} catch (error) {
  logger.error('処理中にエラーが発生しました', { 
    operation: 'database-connection' 
  }, error);
}
```

> [!TIP]
> DEBUGレベルの場合、完全なスタックトレースが出力されます。その他のレベルでは、エラー名とメッセージのみが出力されます。

### 直接Loggerクラスを使用

```typescript
import { Logger, LogLevel, DefaultFormatter, ConsoleTransport } from '@squilla/logger-ts';

const logger = new Logger({
  level: LogLevel.INFO,
  format: new DefaultFormatter(),
  transport: new ConsoleTransport()
});

logger.info('直接作成したロガー');
```

## 🛠️ カスタマイズ

### カスタムフォーマッターの作成

独自のフォーマッターを作成することも可能です。

```typescript
import { LogFormatter, LogEntry, LogLevel } from '@squilla/logger-ts';

class CustomFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const level = LogLevel[entry.level];
    const time = entry.timestamp.toLocaleString('ja-JP');
    return `${time} [${level}] ${entry.message}`;
  }
}

const logger = LoggerFactory.createLogger({
  format: new CustomFormatter()
});
```

### カスタムトランスポートの作成

独自のトランスポートを作成することも可能です。

```typescript
import { LogTransport, LogLevel } from '@squilla/logger-ts';

class FileTransport implements LogTransport {
  constructor(private filename: string) {}

  log(formattedMessage: string, level: LogLevel): void {
    // ファイルに書き込む処理
    console.log(`ファイル ${this.filename} に書き込み: ${formattedMessage}`);
  }
}

const logger = LoggerFactory.createLogger({
  transport: new FileTransport('app.log')
});
```

## 📚 API リファレンス

### LoggerFactory

#### `createLogger(config?: Partial<LoggerConfig>): Logger`

ロガーインスタンスを作成します。

**パラメータ:**
- `config` (optional): ロガーの設定（部分的な設定も可能）

### Logger

#### `debug(message: string, context?: Record<string, unknown>): void`

DEBUGレベルのログを出力します。

#### `info(message: string, context?: Record<string, unknown>): void`

INFOレベルのログを出力します。

#### `warn(message: string, context?: Record<string, unknown>): void`

WARNレベルのログを出力します。

#### `error(message: string, context?: Record<string, unknown>, error?: Error): void`

ERRORレベルのログを出力します。

### 設定interfaces

#### `LoggerConfig`

```typescript
interface LoggerConfig {
  level: LogLevel;
  format?: LogFormatter;
  transport?: LogTransport;
  context?: Record<string, unknown>;
}
```

#### `LogEntry`

```typescript
interface LogEntry {
  level: LogLevel;
  timestamp: Date;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}
```

## 💡 ベストプラクティス

> [!IMPORTANT]
> 以下のベストプラクティスに従うことで、効果的なログ管理が可能になります。

1. **適切なログレベルの使用**
   - `DEBUG`: 開発用の詳細情報
   - `INFO`: 一般的な情報やアプリケーションの状態
   - `WARN`: 注意すべき事項（エラーではないが要注意）
   - `ERROR`: 問題やエラーの発生

2. **コンテキスト情報の活用**
   - トレーサビリティのために関連する情報を含める
   - ユーザーID、リクエストID、操作名などを記録

3. **本番環境での設定**
   - 本番環境では適切なログレベル（通常はINFO以上）を設定
   - 機密情報がログに含まれないよう注意

4. **エラー情報の記録**
   - try-catchブロックでエラーオブジェクトを適切に記録
   - エラーの詳細とコンテキストを併せて記録

> [!WARNING]
> 本番環境では機密情報（パスワード、APIキー、個人情報など）がログに含まれないよう十分注意してください。

## 📄 ライセンス

このプロジェクトは[Apache License 2.0](LICENSE)の下で公開されています。