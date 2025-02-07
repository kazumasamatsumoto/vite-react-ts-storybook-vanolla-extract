import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { mergeConfig, type UserConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// 型ガード: プラグインが存在し、かつ name プロパティを持つかをチェック
function isPlugin(obj: unknown): obj is Plugin {
  return !!obj && typeof obj === "object" && "name" in obj;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(existingConfig: UserConfig) {
    // plugins 配列が undefined の場合は初期化
    if (!existingConfig.plugins) {
      existingConfig.plugins = [];
    }

    // 既存のプラグインの中から、react-refresh プラグイン（存在する場合）を除外する
    existingConfig.plugins = existingConfig.plugins.filter((plugin) => {
      return isPlugin(plugin) && plugin.name !== "react-refresh";
    });

    // fastRefresh を無効にした react プラグインを追加する（型エラーを回避するため any キャスト）
    existingConfig.plugins.push(react({ fastRefresh: false } as any));

    // vanilla-extract プラグインがまだ追加されていなければ追加する
    if (
      !existingConfig.plugins.some(
        (plugin) => isPlugin(plugin) && plugin.name === "vanilla-extract"
      )
    ) {
      existingConfig.plugins.push(vanillaExtractPlugin());
    }

    // 必要に応じ mergeConfig を使ってマージ（空のオブジェクトを渡しています）
    return mergeConfig(existingConfig, {} as UserConfig);
  },
};

export default config;
