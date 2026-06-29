import { Navigate, useParams } from 'react-router-dom';
import { QuestionArticleTemplate } from '../components/QuestionArticleTemplate';
import { getQuestionArticle } from '../data/questions';

export default function QuestionArticle() {
  const { slug } = useParams();
  const article = getQuestionArticle(slug ?? '');

  if (!article) return <Navigate to="/questions" replace />;

  return <QuestionArticleTemplate article={article} />;
}
