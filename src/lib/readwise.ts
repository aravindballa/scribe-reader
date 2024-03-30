const token = import.meta.env.READWISE_TOKEN || 'NO_TOKEN_PROVIDED';

const MAX_DOCUMENTS = 10;

type ReadwiseLocation = 'new' | 'later' | 'shortlist' | 'archive' | 'feed' | null;

type ReadwiseDocument = {
  id: string;
  url: string;
  title: string;
  author: string;
  source: string;
  category: string;
  location: ReadwiseLocation;
  tags: { [key: string]: any };
  site_name: string;
  word_count: number;
  created_at: string;
  updated_at: string;
  published_date: number;
  summary: string;
  image_url: string;
  content: string | null;
  source_url: string;
  notes: string;
  parent_id: string | null;
  reading_progress: number;
};

const fetchDocumentListApi = async (
  updatedAfter: string | null = null,
  location: ReadwiseLocation = null,
  tags = 'scribe'
) => {
  let fullData = [];
  let nextPageCursor = null;

  while (true) {
    const queryParams = new URLSearchParams();
    queryParams.append('category', 'article');
    if (nextPageCursor) {
      queryParams.append('pageCursor', nextPageCursor);
    }
    if (updatedAfter) {
      queryParams.append('updatedAfter', updatedAfter);
    }
    if (location) {
      queryParams.append('location', location);
    }

    const response = await fetch('https://readwise.io/api/v3/list/?' + queryParams.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const responseJson = (await response.json()) as { results: ReadwiseDocument[]; nextPageCursor: string | null };
    fullData.push(...responseJson['results'].filter((doc: any) => Object.keys(doc['tags']).includes(tags)));
    nextPageCursor = responseJson['nextPageCursor'];
    if (!nextPageCursor || fullData.length >= MAX_DOCUMENTS) {
      break;
    }
  }
  return fullData;
};

export default fetchDocumentListApi;
