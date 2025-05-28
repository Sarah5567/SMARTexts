import cohere
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json
from dotenv import load_dotenv
import os

def sanitize(text):
    return text.encode('utf-8', 'surrogatepass').decode('utf-8', 'ignore')


load_dotenv()

def embedded(texts):
    """
    Takes a list of texts and returns their embedding vectors using Cohere's embedding model.

    Args:
        texts (list of str): List of input text strings to embed.

    Returns:
        list[list[float]]: List of embedding vectors corresponding to each input text.
    """
    co = cohere.ClientV2(os.getenv("COHERE_API_KEY"))

    response = co.embed(
        texts=texts,
        model="embed-english-v3.0",
        input_type="classification",
        embedding_types=["float"],
    )
    return response.embeddings.float_

def main():
    """
    Main execution logic:
    - Loads a list of texts and a query.
    - Embeds the query and the texts.
    - Computes cosine similarity between the query and all texts.
    - Chooses the similar results, sorts them, and prints them in descending order.
    """

    # Load texts and query
    try:
        data = json.loads(sys.stdin.read())
        texts = [sanitize(t) for t in data['texts']]
        query = sanitize(data['query'])
    except (IndexError, json.JSONDecodeError):
        print("Usage: script.py '[\"text1\", \"text2\", ...]' \"query string\"")
        sys.exit(1)


    #print(json.dumps(top_documents))
    # Compute cosine similarity between the query and all documents
    query_embedding = embedded([query])
    text_embeddings = embedded(texts)
    similarities = cosine_similarity(query_embedding, text_embeddings)

    # Filter the similar results and sort them (descending)
    similarity_scores = similarities[0]
    sorted_indices = np.argsort(similarity_scores)[::-1]
    threshold = 0.3
    top_documents = [{'title': texts[i], 'index': int(i)} for i in sorted_indices if similarity_scores[i] > threshold]

    # Output sorted documents as JSON
    print(json.dumps(top_documents))

if __name__ == "__main__":
    main()

