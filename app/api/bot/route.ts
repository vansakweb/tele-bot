export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { dic } from "@/lib/dic";
import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  await ctx.api.sendMessage(ctx.chat.id, dic(ctx.message.text), {
    parse_mode: "HTML",
  });
  await ctx.api.sendSticker(
    ctx.chat.id,
    "CAACAgIAAxkBAAEBQ9lg5n2Xo7Zt1s8e3lHjLh6mNqgACVQADwDZPE8KJYpXo9sGQQ",
  ); // A cute cat sticker
});

export const POST = webhookCallback(bot, "std/http");
