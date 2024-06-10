import styles from './skeletonCard.module.css'

const SkeletonCard = () => {
  return (
    <div className={styles.card} data-testid="skeleton-card">
      <div
        data-testid="skeleton-image"
        className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
      <div
        data-testid="skeleton-text-1"
        className={`${styles.skeleton} ${styles.skeletonText}`}></div>
      <div
        data-testid="skeleton-text-2"
        className={`${styles.skeleton} ${styles.skeletonText}`}></div>
    </div>
  )
}

export default SkeletonCard
