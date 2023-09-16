import openai
import pydub

from pydub.playback import play

import matplotlib.pyplot as plt
import numpy as np
import librosa as lr


def artificial_stupidity():
    openai.api_key = ""
    audio_file = open("./marine.mp3", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)

    print(transcript)


def dub():
    media = pydub.AudioSegment.from_mp3("./marine.mp3")
    arr = np.array(media.get_array_of_samples())

    filename = "./marine.mp3"
    signal, sr = lr.load(filename)

    # plt.plot(y)
    # plt.xlabel("Sample Index")
    # plt.ylabel("Amplitude")
    # plt.show()
    #
    # spectrogram = lr.stft(y)
    # spectrogram = np.abs(spectrogram)
    #
    # plt.imshow(spectrogram, origin='lower', aspect='auto')
    # plt.title("Spectrogram")
    # plt.xlabel("Time (samples)")
    # plt.ylabel("Frequency")
    # plt.colorbar()
    # plt.show()

    # mel_spectrogram = lr.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    # log_mel_spectrogram = lr.power_to_db(mel_spectrogram, ref=np.max)
    #
    # plt.imshow(log_mel_spectrogram, origin='lower', aspect='auto')
    # plt.title("Log mel-spectrogram")
    # plt.xlabel("Time (samples)")
    # plt.ylabel("Mel frequency")
    # plt.colorbar()
    # plt.show()

    mel_spectrogram = lr.feature.melspectrogram(
        y=signal, sr=sr, n_mels=128, fmin=20, fmax=16000)
    log_mel_spectrogram = lr.power_to_db(mel_spectrogram)
    mfccs = lr.feature.mfcc(S=log_mel_spectrogram, n_mfcc=13)

    plt.imshow(mfccs, origin='lower', aspect='auto', cmap='jet')
    plt.colorbar()
    plt.title('MFCCs')
    plt.tight_layout()
    plt.show()


dub()
