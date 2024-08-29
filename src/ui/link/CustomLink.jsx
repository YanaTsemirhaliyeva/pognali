import styles from './CustomLink.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CustomLink({ children, href, extraClass, onClick }) {
  return (
    <Link href={href} className={`${styles.link} ${extraClass ? extraClass : ''}`} onClick={onClick}>
      <span data-hover={children}>
        {children}
      </span>
    </Link>
  )
}

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  extraClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

