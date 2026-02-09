export interface ValentineCard {
    id: string;
    owner_user_id: string;
    slug: string;
    partner_name: string;
    creator_name: string | null;
    message: string;
    teddy_key: string;
    created_at: string;
}

export interface TeddyOption {
    key: string;
    name: string;
    src: string;
}

export interface ValentineFormData {
    creatorDisplayName: string;
    partnerName: string;
    message: string;
    teddyKey: string;
}
