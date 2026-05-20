export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { dic } from "@/lib/dic";
import { Bot, webhookCallback, InputFile } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  await ctx.api.sendMessage(ctx.chat.id, dic(ctx.message.text), {
    parse_mode: "HTML",
  });

  await bot.api.sendPhoto(ctx.chat.id, new InputFile("./image.png"), {
    caption: "Hello",
  });
});

export const POST = webhookCallback(bot, "std/http");
 git add .
 git commit -m "add dic"
 git push -u origin main
