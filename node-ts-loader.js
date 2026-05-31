import { registerHooks } from "node:module";
import { ScriptTarget, transpileModule } from "typescript";

process.setSourceMapsEnabled(true);

const transpileOptions = { target: ScriptTarget.ESNext, inlineSourceMap: true };

registerHooks({
  load(fileName, context, nextLoad) {
    if (/\.tsx?$/.test(fileName)) {
      const { source, ...rest } = nextLoad(fileName, context);
      const { outputText } = transpileModule(source.toString(), {
        ...transpileOptions,
        fileName,
      });
      return {
        source: outputText,
        ...rest,
      };
    }
    return nextLoad(fileName, context);
  },
});
