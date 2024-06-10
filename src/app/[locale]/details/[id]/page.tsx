'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './details.module.css'
import Modal from '@/src/components/modal/modal'
import Divider from '@/src/components/divider/divider'
import { usePokemon } from '@/src/context/pokemonContext'
import { useTranslations } from 'next-intl'
import Section from '@/src/components/section/section'
import Loader from '@/src/components/loader/loader'

interface detailsProps {
  params: { id: string; locale: string }
}

export default function Details({ params: { id, locale } }: detailsProps) {
  const { currentPokemon, loading, fetchCardDetails } = usePokemon()
  const [showModal, setShowModal] = useState(false)
  const [ratio] = useState(734 / 1024)
  const info = useTranslations('Info')
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const router = useRouter()

  useEffect(() => {
    fetchCardDetails(id)
  }, [])

  return (
    <div className={styles.container} data-testid="details-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <button
              onClick={() => router.push(`/${locale}`)}
              className={styles.button}
              data-testid="back-button">
              Back
            </button>
          </div>
          <Section>
            <Image
              src={currentPokemon?.images.large!}
              alt={currentPokemon?.name!}
              width={500}
              height={500 * ratio}
              className={styles.image}
              data-testid="pokemon-image"
            />
          </Section>
          <Section testId="pokemon-details">
            <h2 className={styles.name} data-testid="pokemon-name">
              {currentPokemon?.name}
            </h2>
            <p className={styles.detail} data-testid="pokemon-id">
              ID: {currentPokemon?.id}
            </p>
            <p className={styles.detail} data-testid="pokemon-types">
              {info('types')}: {currentPokemon?.types.join(', ')}
            </p>
          </Section>
          <Section>
            <p className={styles.detail} data-testid="pokemon-resistances">
              {info('resistances')}:{' '}
              {currentPokemon?.resistances
                ? currentPokemon?.resistances
                    .map((resistance: any) => resistance.type)
                    .join(', ')
                : 'None'}
            </p>
            <p className={styles.detail} data-testid="pokemon-weaknesses">
              {info('weaknesses')}:{' '}
              {currentPokemon?.weaknesses
                ? currentPokemon?.weaknesses
                    .map((weakness: any) => weakness.type)
                    .join(', ')
                : 'None'}
            </p>
          </Section>
          <Section>
            <button
              onClick={openModal}
              className={styles.button}
              data-testid="open-modal-button">
              {info('button')}
            </button>
          </Section>
        </>
      )}
      <Modal show={showModal} onClose={closeModal}>
        {currentPokemon?.attacks.map((attack, index) => (
          <div key={index} data-testid={`attack-${index}`}>
            {index !== 0 && <Divider />}
            <div className={styles.attack}>
              <h3 data-testid={`attack-name-${index}`}>{attack.name}</h3>
              <p data-testid={`attack-energy-${index}`}>
                {info('energy')}: {attack.convertedEnergyCost} [
                {attack.cost.join(', ')}]
              </p>
              <p data-testid={`attack-damage-${index}`}>
                {attack.damage && `${info('damage')}: ${attack.damage} `}
              </p>
              <p data-testid={`attack-effect-${index}`}>
                {attack.text && `${info('effect')}: ${attack.text}`}
              </p>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  )
}
