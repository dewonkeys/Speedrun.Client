import { SRSegment, SRStrain, SRSystem } from "../types";

const API_BASE_URL = 'http://localhost:5226/api';

export const fetchSRSystems = async (): Promise<SRSystem[]> => {
  const response = await fetch(`${API_BASE_URL}/srsystem`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchSRStrainsBySRSystemId = async (srSystemId: number): Promise<SRStrain[]> => {
  const response = await fetch(`${API_BASE_URL}/srstrain/srsystem/${srSystemId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchSRSegmentsBySRStrainId = async (srStrainId: number): Promise<SRSegment[]> => {
  const response = await fetch(`${API_BASE_URL}/srsegment/srstrain/${srStrainId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const deleteSRSystem = async (srSystemId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/srsystem/${srSystemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const deleteSRStrain = async (srStrainId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/srstrain/${srStrainId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const deleteSRSegment = async (srSegmentId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/srsegment/${srSegmentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const resetSRSegment = async (srSegmentId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/srsegment/${srSegmentId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
