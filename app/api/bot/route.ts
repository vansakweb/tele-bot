export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { dic } from "@/lib/dic";
import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  // await ctx.reply(ctx.message.text);
  await ctx.api.sendMessage(ctx.chat.id, dic(ctx.message.text), {
    parse_mode: "HTML",
  });
});

export const POST = webhookCallback(bot, "std/http");
