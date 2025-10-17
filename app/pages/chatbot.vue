<template>
  <div
    class="flex min-h-screen bg-[#1f1f1f] text-[#e3e3e3] w-[100vw] md:w-[83.4vw] pt-24 md:pt-0 relative overflow-hidden"
  >
    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col z-10">
      <header
        class="flex justify-between items-center px-6 py-4 border-b border-[#333] bg-[#1f1f1f] sticky top-0 z-30"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold">AI Assistant</h1>
          <div v-if="currentConversation" class="text-sm text-[#9aa0a6]">
            {{ currentConversation.messages.length }} messages
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Save Status Indicator -->
          <div v-if="saveStatus" class="flex items-center gap-2 text-sm">
            <div
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': saveStatus === 'saved',
                'bg-yellow-500': saveStatus === 'saving',
                'bg-red-500': saveStatus === 'error',
              }"
            ></div>
            <span class="text-[#9aa0a6]">
              {{
                saveStatus === "saved"
                  ? "Saved"
                  : saveStatus === "saving"
                    ? "Saving..."
                    : "Error"
              }}
            </span>
          </div>

          <!-- Toggle Web History Button -->
          <button
            @click="showSidebar = !showSidebar"
            class="text-[#9aa0a6] hover:text-white transition-colors p-2 flex items-center gap-2 border border-[#333] rounded-full px-3 py-2"
          >
            <i class="fas fa-history"></i>
            <span class="text-sm hidden md:inline">Web History</span>
          </button>

          <div
            class="w-8 h-8 bg-gradient-to-br from-[#4285f4] to-[#9c27b0] rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer"
          >
            {{ (user.displayName || user.name)?.charAt(0).toUpperCase() }}
          </div>
        </div>
      </header>

      <!-- Chat Section -->
      <main
        class="flex-1 flex flex-col items-center justify-center px-6 relative"
      >
        <div v-if="!hasMessages" class="text-center mb-12">
          <div class="text-5xl font-light mb-6">
            <div v-if="auth.user" class="text-white font-bold">
              <h1 class="text-white font-bold">
                Hello, {{ (user.displayName || user.name)?.split(" ")[0] }}
              </h1>
            </div>
          </div>

          <!-- Quick Start Suggestions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              v-for="suggestion in quickSuggestions"
              :key="suggestion.text"
              @click="inputText = suggestion.text"
              class="p-4 bg-[#2d2d2d] hover:bg-[#333] rounded-xl text-left transition-colors border border-[#333] hover:border-[#4285f4]"
            >
              <div class="flex items-center gap-3">
                <i :class="suggestion.icon" class="text-[#4285f4]"></i>
                <div>
                  <p class="text-white font-medium">{{ suggestion.title }}</p>
                  <p class="text-[#9aa0a6] text-sm">{{ suggestion.text }}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Chat Messages -->
        <div
          v-else
          ref="messagesContainer"
          class="w-full max-w-3xl flex-1 overflow-y-auto py-6 space-y-6"
        >
          <div
            v-for="msg in currentMessages"
            :key="msg.id"
            class="flex gap-3"
            :class="{ 'justify-end': msg.sender === 'user' }"
          >
            <div
              v-if="msg.sender === 'assistant'"
              class="w-8 h-8 bg-gradient-to-br from-[#4285f4] to-[#9c27b0] rounded-full flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-robot text-white text-sm"></i>
            </div>

            <div
              class="max-w-[80%] px-4 py-3 rounded-2xl leading-relaxed group relative"
              :class="
                msg.sender === 'user'
                  ? 'bg-[#4285f4] text-white rounded-br-sm'
                  : 'bg-[#2d2d2d] text-[#e3e3e3] rounded-bl-sm'
              "
            >
              <div class="whitespace-pre-wrap">{{ msg.text }}</div>
              <div class="text-xs opacity-70 mt-2">
                {{ formatTime(msg.timestamp) }}
              </div>

              <!-- Copy button -->
              <button
                @click="copyMessage(msg.text)"
                class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-[#333] hover:bg-[#444] text-[#9aa0a6] hover:text-white p-1.5 rounded-full transition-all duration-200 text-xs"
                title="Copy message"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div v-if="isLoading" class="flex gap-3">
            <div
              class="w-8 h-8 bg-gradient-to-br from-[#4285f4] to-[#9c27b0] rounded-full flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div
              class="px-4 py-3 rounded-2xl bg-[#2d2d2d] text-[#e3e3e3] rounded-bl-sm flex items-center gap-2"
            >
              <span class="loader-dot"></span>
              <span class="loader-dot"></span>
              <span class="loader-dot"></span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="w-full max-w-3xl absolute bottom-6 px-8 md:px-0">
          <div
            class="bg-[#2d2d2d] border border-[#333] rounded-3xl p-4 flex items-center gap-4 focus-within:border-[#4285f4] transition-colors"
          >
            <button
              @click="clearInput"
              class="text-[#9aa0a6] hover:bg-[#333] p-2 rounded-full transition-colors"
              :disabled="!inputText.trim()"
            >
              <i class="fas fa-times"></i>
            </button>

            <textarea
              ref="textareaRef"
              v-model="inputText"
              @keydown="handleKeyDown"
              @input="adjustHeight"
              placeholder="Ask AI Assistant..."
              rows="1"
              class="flex-1 bg-transparent border-none outline-none text-[#e3e3e3] placeholder-[#9aa0a6] resize-none max-h-32"
            ></textarea>

            <div class="flex items-center gap-3">
              <button
                @click="sendMessage"
                :disabled="!inputText.trim() || isLoading"
                class="bg-gradient-to-r from-[#4285f4] to-[#9c27b0] hover:from-[#3367d6] hover:to-[#7b1fa2] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-200"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Sidebar Drawer (Right Side) -->
    <transition name="slide-in-right">
      <div
        v-if="showSidebar"
        class="fixed top-0 right-0 w-80 h-full bg-[#171717] border-l border-[#333] flex flex-col z-50 shadow-lg"
      >
        <!-- Sidebar Header -->
        <div
          class="p-4 border-b border-[#333] flex items-center justify-between"
        >
          <h2 class="text-lg font-semibold text-white">Chat History</h2>
          <button
            @click="showSidebar = false"
            class="text-[#9aa0a6] hover:text-white transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- New Chat -->
        <div class="p-4">
          <button
            @click="startNewChat"
            class="w-full bg-gradient-to-r from-[#4285f4] to-[#9c27b0] text-white px-4 py-3 rounded-2xl hover:from-[#3367d6] hover:to-[#7b1fa2] transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <i class="fas fa-plus"></i>
            New Chat
          </button>
        </div>

        <!-- Conversation List -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-if="conversations.length === 0"
            class="p-4 text-center text-[#9aa0a6]"
          >
            <i class="fas fa-comments text-3xl mb-3 opacity-50"></i>
            <p class="text-sm">No conversations yet</p>
            <p class="text-xs">Start a new chat to begin</p>
          </div>

          <div v-else class="p-2 space-y-2">
            <div
              v-for="conversation in conversations"
              :key="conversation.id"
              @click="selectConversation(conversation.id)"
              class="group relative p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#2d2d2d]"
              :class="{
                'bg-[#2d2d2d] border border-[#4285f4]':
                  currentConversationId === conversation.id,
              }"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-[#4285f4] to-[#9c27b0] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-comment text-white text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-white truncate mb-1">
                    {{ conversation.title }}
                  </h3>
                  <p class="text-xs text-[#9aa0a6] truncate">
                    {{ getLastMessage(conversation) }}
                  </p>
                  <p class="text-xs text-[#9aa0a6] mt-1">
                    {{ formatDate(conversation.lastActivity) }}
                  </p>
                </div>
              </div>

              <button
                @click.stop="deleteConversation(conversation.id)"
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition-all duration-200 text-xs"
                title="Delete conversation"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-[#333] text-xs text-[#9aa0a6]">
          <div class="flex items-center justify-between mb-2">
            <span>Conversations: {{ conversations.length }}</span>
            <span>Total: {{ totalMessages }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Last Sync: {{ lastSyncTime }}</span>
            <button
              @click="exportHistory"
              class="text-[#4285f4] hover:text-[#3367d6] transition-colors"
              title="Export chat history"
            >
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Dark overlay -->
    <transition name="fade">
      <div
        v-if="showSidebar"
        @click="showSidebar = false"
        class="fixed inset-0 bg-black/50 z-40"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({
  requiresAuth: true,
});

import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useAuth } from "~/composables/useAuth";

const auth = useAuthStore();
const { user: firebaseUser } = useAuth();
const route = useRoute();

const user = computed(() => ({
  ...auth.user,
  displayName: firebaseUser.value?.displayName,
  photoURL: firebaseUser.value?.photoURL,
}));

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
  userId?: string;
}

const conversations = ref<Conversation[]>([]);
const currentConversationId = ref<string | null>(null);
const inputText = ref("");
const textareaRef = ref<HTMLTextAreaElement>();
const messagesContainer = ref<HTMLElement>();
const isLoading = ref(false);
const showSidebar = ref(false);
const saveStatus = ref<"saved" | "saving" | "error" | null>(null);
const lastSyncTime = ref<string>("Never");

const quickSuggestions = ref([
  {
    title: "Get Creative",
    text: "Help me brainstorm ideas for a creative project",
    icon: "fas fa-lightbulb",
  },
  {
    title: "Learn Something New",
    text: "Explain a complex topic in simple terms",
    icon: "fas fa-graduation-cap",
  },
  {
    title: "Problem Solving",
    text: "Help me solve a problem I'm facing",
    icon: "fas fa-puzzle-piece",
  },
  {
    title: "Code Assistant",
    text: "Help me debug or write some code",
    icon: "fas fa-code",
  },
]);

const currentConversation = computed(() =>
  conversations.value.find((c) => c.id === currentConversationId.value)
);

const currentMessages = computed(
  () => currentConversation.value?.messages || []
);
const hasMessages = computed(() => currentMessages.value.length > 0);

const saveToStorage = async () => {
  try {
    saveStatus.value = "saving";
    const chatData = {
      conversations: conversations.value,
      currentConversationId: currentConversationId.value,
      lastSync: new Date().toISOString(),
      userId: user.value?.uid,
    };

    await $fetch("/api/chat/history", { method: "POST", body: chatData });
    saveStatus.value = "saved";
    lastSyncTime.value = new Date().toLocaleTimeString();
    setTimeout(() => (saveStatus.value = null), 2000);
  } catch (error) {
    console.error("Error saving chat history:", error);
    saveStatus.value = "error";
    setTimeout(() => (saveStatus.value = null), 3000);
  }
};

const loadFromStorage = async () => {
  try {
    if (!user.value?.uid) return;
    const data = await $fetch(`/api/chat/history?userId=${user.value.uid}`);

    if (data) {
      conversations.value =
        data.conversations?.map((conv: any) => ({
          ...conv,
          lastActivity: new Date(conv.lastActivity),
          messages:
            conv.messages?.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })) || [],
        })) || [];

      currentConversationId.value = data.currentConversationId || null;
      lastSyncTime.value = data.lastSync
        ? new Date(data.lastSync).toLocaleTimeString()
        : "Never";
    }
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

const sendMessage = async () => {
  const text = inputText.value.trim();
  if (!text || isLoading.value) return;

  if (!currentConversationId.value) startNewChat();

  const conversation = conversations.value.find(
    (c) => c.id === currentConversationId.value
  );
  if (!conversation) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text,
    sender: "user",
    timestamp: new Date(),
  };

  conversation.messages.push(userMessage);
  conversation.lastActivity = new Date();

  inputText.value = "";
  resetHeight();
  await scrollToBottom();
  await saveToStorage();

  try {
    isLoading.value = true;
    const response = await $fetch<{ reply: string }>("/api/chat", {
      method: "POST",
      body: { message: text },
    });

    // ✅ Limit the AI reply to 3 lines
    const limitedReply = response.reply.split("\n").slice(0, 3).join("\n");

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: limitedReply,
      sender: "assistant",
      timestamp: new Date(),
    };

    conversation.messages.push(assistantMessage);
    conversation.lastActivity = new Date();
    await saveToStorage();
  } catch (error) {
    console.error("AI fetch error:", error);
    conversation.messages.push({
      id: (Date.now() + 1).toString(),
      text: "⚠ Sorry, something went wrong while contacting the AI.",
      sender: "assistant",
      timestamp: new Date(),
    });
    await saveToStorage();
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
};

const startNewChat = () => {
  const newConversation: Conversation = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    lastActivity: new Date(),
    userId: user.value?.uid,
  };
  conversations.value.unshift(newConversation);
  currentConversationId.value = newConversation.id;
  showSidebar.value = false;
};

const selectConversation = (id: string) => {
  currentConversationId.value = id;
  showSidebar.value = false;
  nextTick(scrollToBottom);
};

const deleteConversation = async (id: string) => {
  if (confirm("Are you sure you want to delete this conversation?")) {
    conversations.value = conversations.value.filter((c) => c.id !== id);
    if (currentConversationId.value === id)
      currentConversationId.value = conversations.value[0]?.id || null;
    await saveToStorage();
  }
};

const exportHistory = () => {
  const dataStr = JSON.stringify(conversations.value, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `chat-history-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value)
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
};

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

const resetHeight = () => {
  if (textareaRef.value) textareaRef.value.style.height = "auto";
};

const clearInput = () => {
  inputText.value = "";
  resetHeight();
};

const copyMessage = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy message:", error);
  }
};

const getLastMessage = (c: Conversation) => {
  const last = c.messages[c.messages.length - 1];
  if (!last) return "No messages";
  const preview =
    last.text.length > 50 ? last.text.slice(0, 50) + "..." : last.text;
  return `${last.sender === "user" ? "You: " : "AI: "}${preview}`;
};

const formatDate = (d: Date) => {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString();
};

const formatTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

watch(
  conversations,
  () => {
    if (conversations.value.length > 0) setTimeout(saveToStorage, 1000);
  },
  { deep: true }
);

watch(currentMessages, (msgs) => {
  const conv = currentConversation.value;
  if (conv && msgs.length > 0 && conv.title === "New Chat") {
    const first = msgs.find((m) => m.sender === "user");
    if (first)
      conv.title =
        first.text.length > 30 ? first.text.slice(0, 30) + "..." : first.text;
  }
});

onMounted(() => {
  loadFromStorage();
});
</script>

<style scoped>
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-in-right-enter-from,
.slide-in-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.loader-dot {
  width: 8px;
  height: 8px;
  background-color: #9aa0a6;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite;
}
.loader-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.loader-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1f1f1f;
}

::-webkit-scrollbar-thumb {
  background: #4285f4;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3367d6;
}
</style>