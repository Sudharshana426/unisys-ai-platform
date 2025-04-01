
import { useState } from 'react';

interface UsePerplexityOptions {
  apiKey?: string;
}

interface PerplexityResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const usePerplexity = ({ apiKey: initialApiKey }: UsePerplexityOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [apiKey, setApiKey] = useState(initialApiKey || localStorage.getItem('perplexity_api_key') || '');

  const updateApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('perplexity_api_key', key);
  };

  const query = async (message: string, systemPrompt = 'Be precise and concise.') => {
    if (!apiKey) {
      throw new Error('API key is required. Please set an API key first.');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_domain_filter: ['perplexity.ai'],
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to query Perplexity API: ${errorText}`);
      }

      const data = await response.json() as PerplexityResponse;
      return data.choices[0]?.message?.content || '';
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { query, isLoading, error, apiKey, updateApiKey };
};
