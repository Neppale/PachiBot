import {
  ChannelType,
  Events,
  Message,
  MessageCreateOptions,
  PartialMessage,
} from "discord.js";
import { PachiBotClient } from "../tools/models/client";
import { PachiLogPrefix, pachiLog } from "../tools/pachilog";
import moment from "moment";
import { ChannelIds } from "../tools/models/channelIds";

moment.locale("pt-br");

function formatResponseMessage(
  message: Message<boolean> | PartialMessage
): MessageCreateOptions | undefined {
  if (message.author?.bot) return;
  if (moment().diff(message.editedAt, "minutes") > 5) return;

  const content = message.content ? message.content : "";
  const author = message.author;
  const createdDate = moment(message.createdAt).format("DD/MM/YYYY HH:mm:ss");
  const editDate = message.editedAt
    ? moment(message.editedAt).format("DD/MM/YYYY HH:mm")
    : undefined;

  const images = message.attachments;
  const embeds = message.embeds;

  const imageURLs = images.map((image) => image.url);
  const embedURLs = embeds.map((embed) => embed.url);

  const messageUrls = [...imageURLs, ...embedURLs];

  const messageMetadata = `${author?.tag} disse às ${createdDate}${
    editDate ? ` (editado às ${editDate})` : ""
  }:`;
  const messageContent = content
    .split(" ")
    .filter((word) => !messageUrls.includes(word))
    .join(" ");

  const messageCreateOptions: MessageCreateOptions = {
    content: `${messageMetadata}\n\n${messageContent}`,
    embeds: embeds,
    files: images.map((image) => image.attachment),
  };

  return messageCreateOptions;
}

export function filterEmbeds(client: PachiBotClient) {
  client.on(Events.MessageCreate, async (message) => {
    if (
      message.author.bot ||
      message.channelId === ChannelIds.Midias ||
      !message.embeds.length ||
      !message.attachments.size
    )
      return;

    const responseMessage = formatResponseMessage(message);
    if (!responseMessage) return;

    const responseChannel = client.channels.cache.get(ChannelIds.Midias);

    if (!responseChannel) {
      pachiLog("O canal #midias não foi encontrado.", PachiLogPrefix.ERROR);
      return;
    }
    await message.delete();
    if (responseChannel.type === ChannelType.GuildText) {
      responseChannel.send(responseMessage);
    }
    pachiLog(
      `Mensagem de ${message.author.tag} enviada para o canal #midias.`,
      PachiLogPrefix.INFO
    );
  });

  client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
    if (
      newMessage.author?.bot ||
      newMessage.channelId === ChannelIds.Midias ||
      !newMessage.embeds.length ||
      !newMessage.attachments.size
    )
      return;

    const responseMessage = formatResponseMessage(newMessage);
    if (!responseMessage) return;

    const responseChannel = client.channels.cache.get(ChannelIds.Midias);

    if (!responseChannel) {
      pachiLog("O canal #midias não foi encontrado.", PachiLogPrefix.ERROR);
      return;
    }
    await newMessage.delete();
    if (responseChannel.type === ChannelType.GuildText) {
      responseChannel.send(responseMessage);
    }
    pachiLog(
      `Mensagem de ${newMessage.author?.tag} enviada para o canal #midias.`,
      PachiLogPrefix.INFO
    );
  });
}
