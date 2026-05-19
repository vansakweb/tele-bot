import sentences from "@/data/sentences.json";
import words from "@/data/words.json";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  // await ctx.reply(ctx.message.text);
  await ctx.api.sendMessage(ctx.chat.id, "<b>Hello, World!</b>", {
    parse_mode: "HTML",
  });
});

export const POST = webhookCallback(bot, "std/http");
