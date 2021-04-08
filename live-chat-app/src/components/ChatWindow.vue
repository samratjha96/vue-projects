<template>
    <div class="chat-window">
        <div v-if="error"> {{ error }}</div>
        <div v-if="documents" class="messages" ref="messages">
            <div v-for="doc in formattedDocuments" :key="doc.id" class="singleChat">
                <span class="created-at">{{ doc.createdAt }} ago</span>
                <span class="name">{{ doc.name }}</span>
                <span class="message">{{ doc.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from "@/lib/getCollection"
import { formatDistanceToNow } from "date-fns"
import { computed, onUpdated, ref } from "vue";

export default {
    setup() {
        const { error, documents } = getCollection("messages");

        const formattedDocuments = computed(() => {
            return documents.value && documents.value.map(doc => {
                const time = formatDistanceToNow(doc.createdAt.toDate());
                return {
                    ...doc,
                    createdAt: time
                }
            })
        })

        // auto scroll to bottom of messages window
        const messages = ref(null);

        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight;
        })

        return {
            error,
            documents,
            formattedDocuments,
            messages
        }
    }
}
</script>

<style>
    .chat-window {
        background: #fafafa;
        padding: 30px 20px;
    }

    .singleChat {
        margin: 18px 0;
    }

    .created-at {
        display: block;
        color: #999;
        font-size: 12px;
        margin-bottom: 4px;
    }

    .name {
        font-weight: bold;
        margin-right: 6px;
    }

    .messages {
        max-height: 400px;
        overflow: auto;
    }
</style>