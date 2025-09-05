// slices/processing.ts
import { StateCreator } from 'zustand';

export interface ProcessingSlice {
  // State для замены useRef
  isProcessingPrompt: boolean;
  lastProcessedPrompt: string;
  activeCreateChatRequests: string[];
  isSendingPrompts: boolean;
  
  // Actions
  setIsProcessingPrompt: (processing: boolean) => void;
  setLastProcessedPrompt: (prompt: string) => void;
  addActiveCreateChatRequest: (uuid: string) => void;
  removeActiveCreateChatRequest: (uuid: string) => void;
  hasActiveCreateChatRequest: (uuid: string) => boolean;
  setIsSendingPrompts: (sending: boolean) => void;
  resetProcessingStates: () => void;
}

const processingSlice: StateCreator<
  ProcessingSlice,
  [],
  [],
  ProcessingSlice
> = (set, get) => ({
  // State
  isProcessingPrompt: false,
  lastProcessedPrompt: '',
  activeCreateChatRequests: [],
  isSendingPrompts: false,
  
  // Actions
  setIsProcessingPrompt: (processing: boolean) => 
    set({ isProcessingPrompt: processing }),
    
  setLastProcessedPrompt: (prompt: string) => 
    set({ lastProcessedPrompt: prompt }),
    
  addActiveCreateChatRequest: (uuid: string) => 
    set((state) => ({
      activeCreateChatRequests: state.activeCreateChatRequests.includes(uuid) 
        ? state.activeCreateChatRequests 
        : [...state.activeCreateChatRequests, uuid]
    })),
    
  removeActiveCreateChatRequest: (uuid: string) => 
    set((state) => ({
      activeCreateChatRequests: state.activeCreateChatRequests.filter(id => id !== uuid)
    })),
    
  hasActiveCreateChatRequest: (uuid: string) => 
    get().activeCreateChatRequests.includes(uuid),
    
  setIsSendingPrompts: (sending: boolean) => 
    set({ isSendingPrompts: sending }),
    
  resetProcessingStates: () => 
    set({
      isProcessingPrompt: false,
      lastProcessedPrompt: '',
      activeCreateChatRequests: [],
      isSendingPrompts: false,
    }),
});

export default processingSlice;