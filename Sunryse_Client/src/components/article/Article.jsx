import PropTypes from 'prop-types';
import styles from './Article.module.scss';

Article.propTypes = {
  article: PropTypes.objectOf({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string,
  }).isRequired,
  xyzStyles: PropTypes.string,
  titleClass: PropTypes.string,
  descClass: PropTypes.string,
  contentClass: PropTypes.string,
};

export default function Article({
  article,
  xyzStyles = '',
  titleClass = '',
  descClass = '',
  contentClass = '',
}) {
  return (
    <article className={`${styles.card} ${xyzStyles}`}>
      <div className={`${styles.content} ${contentClass}`}>
        <p className={`${styles.title} ${titleClass}`}>{article.title}</p>
        <p className={`${styles.description} ${descClass}`}>
          {article.description}
        </p>
      </div>
      <img src={article.img} />
    </article>
  );
}
